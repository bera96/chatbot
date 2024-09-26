import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Session } from 'src/sessions/sessions.schema';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    ],
  })
  sessionId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  sequence: number;

  @Prop({ required: false })
  timeStamp: Date;

  _id?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
