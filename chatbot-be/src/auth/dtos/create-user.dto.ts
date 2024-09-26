import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
