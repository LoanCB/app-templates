import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CustomHttpException } from 'src/common/helpers/custom.exception';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';
import { ReturnUser } from '../types/return-user.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<ReturnUser> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      const payload = { userId: user.id, username: user.email };
      const { password, ...returnUser } = user;
      return {
        accessToken: await this.jwtService.signAsync(payload),
        user: returnUser,
      };
    }
    throw new CustomHttpException('INVALID_CREDENTIALS', HttpStatus.BAD_REQUEST);
  }

  /**
   * Validate if api key is related to a user
   * @param apiKey - string
   * @returns Promise<User | null>
   */
  async validateApiKey(apiKey: string): Promise<User | undefined> {
    return this.usersService.findByApiKey(apiKey);
  }
}
