import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "../services/categories.service";
import { Category } from "../schemas/category.schema";

@Controller("api/categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
