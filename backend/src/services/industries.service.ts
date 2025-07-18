import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Industry } from "../schemas/industry.schema";

@Injectable()
export class IndustriesService {
  constructor(
    @InjectModel(Industry.name) private industryModel: Model<Industry>,
  ) {}

  async findAll(): Promise<Industry[]> {
    return this.industryModel.find().exec();
  }
}
