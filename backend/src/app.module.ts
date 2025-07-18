import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectsModule } from "./modules/projects.module";
import { CategoriesModule } from "./modules/categories.module";
import { SubcategoriesModule } from "./modules/subcategories.module";
import { IndustriesModule } from "./modules/industries.module";
import { SkillsModule } from "./modules/skills.module";
import { SpecialtiesModule } from "./modules/specialties.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProjectsModule,
    CategoriesModule,
    SubcategoriesModule,
    IndustriesModule,
    SkillsModule,
    SpecialtiesModule,
  ],
})
export class AppModule {}
