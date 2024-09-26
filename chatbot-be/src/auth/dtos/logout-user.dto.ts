import { IsNotEmpty } from 'class-validator';

export class LogoutUserDto {
  @IsNotEmpty({ message: 'userId' })
  userId: string;
}
