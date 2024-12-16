import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import configurationConfig from 'src/config/configuration.config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './helpers/jwt.strategy';
import { AuthService } from './services/auth.service';

const configService = new ConfigService(configurationConfig());

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: configService.get('secret'),
      signOptions: { expiresIn: `${configService.get('jwtTime')}s` },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
