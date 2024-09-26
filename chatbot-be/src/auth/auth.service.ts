import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from 'src/users/users.schema';

export interface UserWithToken extends User {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserWithToken }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const newUser = await this.usersService.create(
      createUserDto.name,
      createUserDto.email,
      hashedPassword,
    );

    const payload = { email: newUser.email, sub: newUser._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        _id: newUser._id,
        password: '',
        email: newUser.email,
        name: newUser.name,
        accessToken: accessToken,
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ user: UserWithToken }> {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);

    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        _id: user._id,
        password: '',
        email: user.email,
        name: user.name,
        accessToken: accessToken,
      },
    };
  }
}
