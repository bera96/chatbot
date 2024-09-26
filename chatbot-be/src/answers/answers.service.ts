import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from './answers.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}

  async create(answerData: {
    questionId: string;
    answer: string;
    userId: string;
  }): Promise<Answer> {
    const date = new Date();
    const newAnswer = new this.answerModel({
      ...answerData,
      text: answerData.answer,
      timeStamp: date,
    });
    return newAnswer.save();
  }
}
