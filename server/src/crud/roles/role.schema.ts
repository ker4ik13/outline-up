import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  collection: 'roles',
})
export class Role {
  @ApiProperty({
    example: 'Администратор',
    description: 'Название роли',
  })
  @Prop({
    required: true,
  })
  value: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
