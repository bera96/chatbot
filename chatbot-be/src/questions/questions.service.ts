import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './questions.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async createQuestions(sessionId: any): Promise<Question[]> {
    const questions: Question[] = [
      {
        text: 'What is your favorite breed of cat, and why?',
        sequence: 1,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'How do you think cats communicate with their owners?',
        sequence: 2,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'Have you ever owned a cat? If so, what was their name and personality like?',
        sequence: 3,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'Why do you think cats love to sleep in small, cozy places?',
        sequence: 4,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'What’s the funniest or strangest behavior you’ve ever seen a cat do?',
        sequence: 5,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'Do you prefer cats or kittens, and what’s the reason for your preference?',
        sequence: 6,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'Why do you think cats are known for being independent animals?',
        sequence: 7,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'How do you think cats manage to land on their feet when they fall?',
        sequence: 8,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'What’s your favorite fact or myth about cats?',
        sequence: 9,
        timeStamp: null,
        sessionId: sessionId,
      },
      {
        text: 'How would you describe the relationship between humans and cats in three words?',
        sequence: 10,
        timeStamp: null,
        sessionId: sessionId,
      },
    ];
    return this.questionModel.insertMany(questions);
  }

  async getQuestionBySequence(
    sequence: number,
    sessionId: string,
  ): Promise<Question | null> {
    return this.questionModel.findOne({ sequence, sessionId }).exec();
  }

  async updateTimeStamp(questionId: string): Promise<Question> {
    return this.questionModel
      .findByIdAndUpdate(questionId, { timeStamp: new Date() }, { new: true })
      .exec();
  }
}
