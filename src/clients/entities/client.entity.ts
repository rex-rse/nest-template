import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Client extends Document {
  @Prop({ required: true })
  name: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
