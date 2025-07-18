import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subcategory } from "../schemas/subcategory.schema";

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryModel.find().exec();
  }
}
