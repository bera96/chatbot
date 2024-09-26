import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { Question, QuestionSchema } from './questions.schema';
import { QuestionsController } from './questions.controller';
import { AnswersModule } from 'src/answers/answers.module';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
    AnswersModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
