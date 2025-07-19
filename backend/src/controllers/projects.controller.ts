import { Controller, Get, Query, Param, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { Project } from "../schemas/project.schema";

interface FilterQuery {
  specialties?: string;
  skills?: string;
  projectType?: string;
  industries?: string;
  sortOrder?: 'asc' | 'desc';
}

@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() query: FilterQuery): Promise<Project[]> {
    const filters = {
      specialties: query.specialties ? query.specialties.split(',') : [],
      skills: query.skills ? query.skills.split(',') : [],
      projectType: query.projectType ? query.projectType.split(',') : [],
      industries: query.industries ? query.industries.split(',') : []
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
