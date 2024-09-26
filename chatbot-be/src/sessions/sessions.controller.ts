import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { SessionsService } from 'src/sessions/sessions.service';
import { Session } from './sessions.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AnswerSessionDto } from './dtos/answer-session.dto';
import { CreateSessionDto } from './dtos/create-sesssion.dto';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('user/:id')
  async getSessions(@Param() userId: any): Promise<Session[]> {
    return this.sessionsService.getAllForUser(userId.id);
  }

  @Get('session/:sessionId')
  async getSession(@Param() sessionId: any): Promise<Session> {
    return this.sessionsService.getSession(sessionId.sessionId);
  }

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Delete(':sessionId')
  async deleteSession(@Param() sessionId: any) {
    return this.sessionsService.deleteSession(sessionId.sessionId);
  }

  @Post('/answer')
  async answer(@Body() answerSessionDto: AnswerSessionDto) {
    const updatedSession =
      await this.sessionsService.createAnswerAndUpdateSession(answerSessionDto);
    const sessionWithAnswers = await this.sessionsService.getSessionWithAnswers(
      updatedSession._id,
    );
    return sessionWithAnswers;
  }
}
