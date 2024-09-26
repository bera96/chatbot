import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  readonly currentSessionId?: string;

  @IsNotEmpty()
  @IsString()
  readonly tenantId: string;
}
