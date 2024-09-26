import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerSessionDto {
  @IsNotEmpty()
  @IsString()
  readonly sessionId: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly questionId: string;

  @IsNotEmpty()
  @IsString()
  readonly answer: string;
}
