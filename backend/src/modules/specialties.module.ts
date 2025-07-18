import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SpecialtiesController } from "../controllers/specialties.controller";
import { SpecialtiesService } from "../services/specialties.service";
import { Specialty, SpecialtySchema } from "../schemas/specialty.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Specialty.name, schema: SpecialtySchema },
    ]),
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService],
})
export class SpecialtiesModule {}
