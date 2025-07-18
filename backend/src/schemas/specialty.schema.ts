import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Specialty extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const SpecialtySchema = SchemaFactory.createForClass(Specialty);
