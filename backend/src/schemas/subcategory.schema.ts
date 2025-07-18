import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Subcategory extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  categoryId: string;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
