import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.create(name, email, password);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Body('email') email: string) {
    return this.usersService.deleteUser(email);
  }
}
