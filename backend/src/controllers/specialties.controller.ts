import { Controller, Get } from "@nestjs/common";
import { SpecialtiesService } from "../services/specialties.service";
import { Specialty } from "../schemas/specialty.schema";

@Controller("api/specialties")
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) {}

  @Get()
  async findAll(): Promise<Specialty[]> {
    return this.specialtiesService.findAll();
  }
}
