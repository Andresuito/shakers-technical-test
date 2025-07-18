import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Specialty } from "../schemas/specialty.schema";

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectModel(Specialty.name) private specialtyModel: Model<Specialty>,
  ) {}

  async findAll(): Promise<Specialty[]> {
    return this.specialtyModel.find().exec();
  }
}
