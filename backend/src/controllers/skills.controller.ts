import { Controller, Get } from "@nestjs/common";
import { SkillsService } from "../services/skills.service";
import { Skill } from "../schemas/skill.schema";

@Controller("api/skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }
}
