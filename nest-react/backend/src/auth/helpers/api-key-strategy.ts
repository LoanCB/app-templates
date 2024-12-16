import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { User } from 'src/users/entities/users.entity';
import { CustomHttpException } from '../../common/helpers/custom.exception';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super(
      { header: 'x-api-key', prefix: '' },
      false,
      async (
        apiKey: string,
        verified: (err: Error | null, user: User | undefined, info: string | number | null) => Promise<void>,
      ) => {
        this.validate(apiKey, verified);
      },
    );
  }

  async validate(
    apiKey: string,
    verified: (err: CustomHttpException | null, user: User | undefined, info: string | number | null) => Promise<void>,
  ): Promise<void> {
    const user = await this.authService.validateApiKey(apiKey);
    if (!user) {
      return verified(new CustomHttpException('INVALID_API_KEY', HttpStatus.UNAUTHORIZED), undefined, null);
    }

    return verified(null, user, null);
  }
}
