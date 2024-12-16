import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      const payload = { userId: user.id, username: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
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
