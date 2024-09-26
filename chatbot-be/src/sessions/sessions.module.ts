import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionsService } from './sessions.service';
import { Session, SessionSchema } from './sessions.schema';
import { SessionsController } from './sessions.controller';
import { AnswersModule } from 'src/answers/answers.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
