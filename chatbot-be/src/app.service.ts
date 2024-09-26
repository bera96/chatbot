import { Injectable, OnModuleInit } from '@nestjs/common';
import { QuestionsService } from './questions/questions.service';
import { Question } from './questions/questions.schema';

@Injectable()
export class AppService {
  constructor(private readonly questionsService: QuestionsService) {}
}
