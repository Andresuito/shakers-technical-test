import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectsController } from "../controllers/projects.controller";
import { ProjectsService } from "../services/projects.service";
import { Project, ProjectSchema } from "../schemas/project.schema";
import { Skill, SkillSchema } from "../schemas/skill.schema";
import { Category, CategorySchema } from "../schemas/category.schema";
import { Industry, IndustrySchema } from "../schemas/industry.schema";
import { Specialty, SpecialtySchema } from "../schemas/specialty.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Industry.name, schema: IndustrySchema },
      { name: Specialty.name, schema: SpecialtySchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
