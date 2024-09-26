import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Answer } from 'src/answers/answers.schema';
import { Question } from 'src/questions/questions.schema';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  endedAt: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: Question[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] })
  answers: Answer[];
  _id: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
