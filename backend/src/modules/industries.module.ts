import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { IndustriesController } from "../controllers/industries.controller";
import { IndustriesService } from "../services/industries.service";
import { Industry, IndustrySchema } from "../schemas/industry.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Industry.name, schema: IndustrySchema },
    ]),
  ],
  controllers: [IndustriesController],
  providers: [IndustriesService],
  exports: [IndustriesService],
})
export class IndustriesModule {}
