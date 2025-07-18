import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Organization {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  logo: string;

  @Prop()
  industry: number;
}

@Schema()
export class ProjectLeader {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  lastName: string;
}

@Schema()
export class Budget {
  @Prop()
  hourFrom: number;

  @Prop()
  hourTo: number;

  @Prop()
  total: number;
}

@Schema()
export class FAQ {
  @Prop()
  question: string;

  @Prop()
  answer: string;
}

@Schema()
export class Position {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop([Number])
  skills: number[];

  @Prop([Number])
  specialties: number[];

  @Prop()
  referralBonus: number;
}

@Schema()
export class Project extends Document {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop({ type: Organization })
  organization: Organization;

  @Prop({ type: ProjectLeader })
  projectLeader: ProjectLeader;

  @Prop()
  category: number;

  @Prop()
  subcategory: number;

  @Prop()
  startDate: string;

  @Prop({ type: Budget })
  budget: Budget;

  @Prop()
  totalHours: number;

  @Prop()
  description: string;

  @Prop([String])
  goals: string[];

  @Prop([FAQ])
  faqs: FAQ[];

  @Prop()
  status: string;

  @Prop()
  creationDate: string;

  @Prop([Position])
  positions: Position[];

  @Prop([Number])
  skills: number[];

  @Prop([Number])
  specialties: number[];

  @Prop()
  totalApplicationsAmount: number;

  @Prop()
  publishedAt: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
