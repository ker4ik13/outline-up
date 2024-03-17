import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { options } from 'src/config';
import { User, UserSchema } from 'src/crud/user/user.schema';
import { RoleControllerDocs } from 'src/docs/role.controller.docs';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from './role.schema';
import { RoleService } from './role.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync(options()),
  ],
  controllers: [RoleController, RoleControllerDocs],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
