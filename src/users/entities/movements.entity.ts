import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Users } from "./users.entity";

@Schema()
export class Movements extends Document {

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Number, required: true })
  value: number;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId , ref : Users.name})
  user: Users | Types.ObjectId
};

export const MovementsShema = SchemaFactory.createForClass(Movements);