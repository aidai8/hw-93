import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User, UserDocument, UserRole } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';
import { randomUUID } from 'node:crypto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  register(@Body() registerUserDto: RegisterUserDto) {
    const user = new this.userModel({
      email: registerUserDto.email,
      displayName: registerUserDto.displayName,
      password: registerUserDto.password,
    });

    user.generateToken();
    return user.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/sessions')
  login(@Req() req: Request<{ user: User }>) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('/secret')
  secret(@Req() req: Request<{ user: User }>) {
    return { user: req.user, message: 'Secret content' };
  }

  @UseGuards(TokenAuthGuard)
  @Delete('/sessions')
  async logout(@Req() req: Request & { user: UserDocument }) {
    req.user.token = randomUUID();
    await req.user.save();
    return { message: 'Successfully logged out' };
  }

  @UseGuards(TokenAuthGuard, AdminGuard)
  @Post('/admin')
  createAdmin(@Body() dto: RegisterUserDto) {
    const user = new this.userModel({
      ...dto,
      role: UserRole.ADMIN,
    });
    user.generateToken();
    return user.save();
  }
}
