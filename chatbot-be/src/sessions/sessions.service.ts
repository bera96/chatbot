import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from './sessions.schema';
import { AnswerSessionDto } from './dtos/answer-session.dto';
import { AnswersService } from 'src/answers/answers.service';
import { Answer } from 'src/answers/answers.schema';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/questions.schema';
import { CreateSessionDto } from './dtos/create-sesssion.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
    private answerService: AnswersService,
    private questionsService: QuestionsService,
  ) {}

  async createSession(createSesionDto: CreateSessionDto): Promise<Session> {
    const { tenantId, currentSessionId } = createSesionDto;
    if (currentSessionId) {
      const endDate = new Date();
      const currentSession = await this.sessionModel.findOneAndUpdate(
        { _id: currentSessionId },
        { endedAt: endDate },
      );
      currentSession.save();
    }
    const session = new this.sessionModel({
      tenantId,
      startedAt: new Date(),
      endedAt: new Date(),
      questions: [],
      answers: [],
    });
    const savedSession = await session.save();

    const questions = await this.questionsService.createQuestions(
      savedSession._id,
    );

    await this.questionsService.updateTimeStamp(questions[0]._id);

    savedSession.questions.push(questions[0]);
    return savedSession.save();
  }

  async deleteSession(sessionId: string) {
    return await this.sessionModel.deleteOne({ _id: sessionId }).exec();
  }

  async getSession(sessionId: string): Promise<Session> {
    const session = await this.sessionModel
      .findByIdAndUpdate(sessionId, { endedAt: new Date() })
      .populate('questions')
      .populate('answers');
    session.save();
    return session;
  }

  async getAllForUser(userId: string): Promise<Session[]> {
    return await this.sessionModel
      .find({ tenantId: userId })
      .populate('questions')
      .populate('answers');
  }

  async createAnswerAndUpdateSession(
    answerSessionDto: AnswerSessionDto,
  ): Promise<Session> {
    const answer = await this.answerService.create(answerSessionDto);

    const updatedSession = await this.updateSession(
      answer,
      answerSessionDto.sessionId,
    );

    return updatedSession;
  }

  private async getNextQuestion(
    questions: Question[],
    currentSequence: number,
  ): Promise<Question | null> {
    const nextSequence = currentSequence + 1;
    const sessionId = questions[0].sessionId;
    const nextQuestion = await this.questionsService.getQuestionBySequence(
      nextSequence,
      sessionId,
    );
    await this.questionsService.updateTimeStamp(nextQuestion._id);

    return nextQuestion;
  }

  async updateSession(answer: Answer, sessionId: string) {
    const updatedSession = await this.sessionModel
      .findByIdAndUpdate(
        sessionId,
        { $push: { answers: answer } },
        { new: true },
      )
      .populate('questions');
    if (!updatedSession) {
      throw new Error('Session not found');
    }

    const lastQuestion = updatedSession.questions.reduce((max, question) => {
      return question.sequence > max.sequence ? question : max;
    });

    const nextQuestion = await this.getNextQuestion(
      updatedSession.questions,
      lastQuestion.sequence,
    );

    if (nextQuestion) {
      updatedSession.questions.push(nextQuestion);
      await updatedSession.save();
    }

    return updatedSession;
  }

  async getSessionWithAnswers(sessionId: string): Promise<Session> {
    return this.sessionModel
      .findById(sessionId)
      .populate([{ path: 'answers' }, { path: 'questions' }])
      .exec();
  }
}
