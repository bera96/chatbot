import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersService } from './answers.service';
import { Answer, AnswerSchema } from './answers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  providers: [AnswersService],
  exports: [AnswersService],
})
export class AnswersModule {}
