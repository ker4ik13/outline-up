import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MailModule } from 'src/crud/mail/mail.module';
import { RoleModule } from 'src/crud/roles/role.module';
import { Role, RoleSchema } from 'src/crud/roles/role.schema';
import { TokenModule } from 'src/crud/token/token.module';
import { UserControllerDocs } from 'src/docs/user.controller.docs';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    RoleModule,
    MailModule,
    TokenModule,
  ],
  controllers: [UserController, UserControllerDocs],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
