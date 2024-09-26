import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
