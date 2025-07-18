import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SkillsController } from "../controllers/skills.controller";
import { SkillsService } from "../services/skills.service";
import { Skill, SkillSchema } from "../schemas/skill.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
