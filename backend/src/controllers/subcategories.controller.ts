import { Controller, Get } from "@nestjs/common";
import { SubcategoriesService } from "../services/subcategories.service";
import { Subcategory } from "../schemas/subcategory.schema";

@Controller("api/subcategories")
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  async findAll(): Promise<Subcategory[]> {
    return this.subcategoriesService.findAll();
  }
}
