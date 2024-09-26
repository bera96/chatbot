import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Answer {
  @Prop({ required: true, type: String })
  questionId: string;

  @Prop({ required: true, type: String })
  text: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  timeStamp: Date;
}

export type AnswerDocument = Answer & Document;
export const AnswerSchema = SchemaFactory.createForClass(Answer);
