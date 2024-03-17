import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  UserBlocked,
  UserInfo,
  UserNotifications,
  UserPrivate,
} from 'src/types/user';
import { UserWithoutId } from 'src/types/user/User';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
})
export class User implements UserWithoutId {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop()
  updatedAt?: string;

  @Prop({
    required: true,
  })
  roles: string[];

  @Prop({
    required: true,
    _id: false,
    type: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      userName: String,
      photo: String,
      status: String,
      links: {
        _id: false,
        type: [
          {
            label: { type: String, required: true },
            link: { type: String, required: true },
          },
        ],
      },
      about: String,
      contactEmail: String,
      languages: [String],

      phone: {
        _id: false,
        type: {
          number: { type: String, required: true },
          country: { type: String, required: true },
        },
      },

      job: {
        _id: false,
        type: {
          company: String,
          position: { type: String, required: true },
          from: String,
          to: String,
        },
      },
    },
  })
  info: UserInfo;

  @Prop({
    required: true,
    _id: false,
    type: {
      password: { type: String, required: true },
      passwordUpdatedAt: String,
      telegramId: Number,
      createdAt: String,
    },
  })
  private: UserPrivate;

  @Prop({
    required: false,
    _id: false,
    type: {
      isBlocked: { type: Boolean, default: false, required: true },
      blockReason: { type: String, required: true },
      blockDate: {
        type: String,
        required: true,
        default: new Date().toISOString(),
      },
    },
  })
  blocked?: UserBlocked;

  @Prop({
    required: false,
    _id: false,
    type: {
      email: Boolean,
      telegram: Boolean,
    },
  })
  notifications?: UserNotifications;
}

export const UserSchema = SchemaFactory.createForClass(User);
