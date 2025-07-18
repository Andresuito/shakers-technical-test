import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Industry extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;
}

export const IndustrySchema = SchemaFactory.createForClass(Industry);
