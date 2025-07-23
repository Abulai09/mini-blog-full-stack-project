// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'JWT_SECRET', // в проде - использовать env
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
   exports: [JwtModule],
})
export class AuthModule {}
