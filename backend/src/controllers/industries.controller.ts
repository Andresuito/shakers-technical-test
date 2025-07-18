import { Controller, Get } from "@nestjs/common";
import { IndustriesService } from "../services/industries.service";
import { Industry } from "../schemas/industry.schema";

@Controller("api/industries")
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  async findAll(): Promise<Industry[]> {
    return this.industriesService.findAll();
  }
}
