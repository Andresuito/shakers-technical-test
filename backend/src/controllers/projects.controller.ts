import { Controller, Get, Query, Param, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { Project } from "../schemas/project.schema";

interface FilterQuery {
  especialidades?: string;
  habilidades?: string;
  tipoProyecto?: string;
  industrias?: string;
  sortOrder?: 'asc' | 'desc';
}

@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() query: FilterQuery): Promise<Project[]> {
    const filters = {
      especialidades: query.especialidades ? query.especialidades.split(',') : [],
      habilidades: query.habilidades ? query.habilidades.split(',') : [],
      tipoProyecto: query.tipoProyecto ? query.tipoProyecto.split(',') : [],
      industrias: query.industrias ? query.industrias.split(',') : []
    };
    
    const sortOptions = query.sortOrder ? {
      sortOrder: query.sortOrder
    } : undefined;
    
    return this.projectsService.findAll(filters, sortOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project> {
    const project = await this.projectsService.findById(parseInt(id));
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }
}
