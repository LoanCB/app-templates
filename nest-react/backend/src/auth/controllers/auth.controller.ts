import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { CommonSwaggerResponse } from 'src/common/helpers/common-swagger-config.helper';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { LoginDto } from 'src/users/dto/login.dto';
import { User } from 'src/users/entities/users.entity';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller({
  path: 'auth',
  version: ['1'],
})
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Auth')
@CommonSwaggerResponse()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: ExpressRequest): User {
    const user = req.user;

    if (!user) {
      throw new CustomHttpException('REQUEST_USER_NOT_FOUND', 404);
    }

    return user as User;
  }
}
