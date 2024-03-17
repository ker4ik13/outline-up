import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/crud/mail/mail.module';
import { TokenModule } from 'src/crud/token/token.module';
import { UserModule } from 'src/crud/user/user.module';
import { AuthControllerDocs } from 'src/docs/auth.controller.docs';
import { options } from '../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GUARDS } from './guards';
import { STRATEGIES } from './strategies';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync(options()),
    MailModule,
    TokenModule,
  ],
  controllers: [AuthController, AuthControllerDocs],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
