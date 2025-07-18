import { Controller, Get } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { Project } from "../schemas/project.schema";

@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}
