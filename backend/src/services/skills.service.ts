import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Skill } from "../schemas/skill.schema";

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<Skill>) {}

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }
}
