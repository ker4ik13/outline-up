import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import {
  User,
  UserBlocked,
  UserInfo,
  UserNotifications,
  UserPrivate,
} from 'src/types/user';

export class UserDto {
  @ApiProperty({
    example: 'dsaudysadsydsa6dt56dsad6atsd67as',
    description: 'Уникальный ID пользователя',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    example: 'myemail@gmail.com',
    description: 'Почта пользователя',
  })
  email: string;

  @ApiProperty({
    example: '2023-12-20T15:09:55.204Z',
    description: 'Дата последнего изменения аккаунта',
  })
  updatedAt?: string;

  @ApiProperty({
    example: ['Создатель', 'Главный администратор'],
    description: 'Роли пользователя',
  })
  roles: string[];

  @ApiProperty({
    example: {
      name: 'Иван',
      lastName: 'Иванов',
      userName: 'ivan2004',
      photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      status: 'Думою...',
      links: [
        {
          label: 'github',
          value: 'https://github.com/ker4ik13',
        },
        {
          label: 'telegram',
          value: 'https://t.me/ker4ik13',
        },
      ],
      about: 'О себе',
      contactEmail: 'myemail@gmailcom',
      languages: ['ru', 'en'],
      phone: {
        country: 'Russia',
        number: '+7 999 999 99 99',
      },

      job: {
        company: 'Компания',
        position: 'Должность',
        from: '2023-12-20T15:09:55.204Z',
        to: '2023-12-20T15:09:55.204Z',
      },
    },
    description: 'Информация о пользователе',
  })
  info: UserInfo;

  @ApiProperty({
    description: 'Приватная информация пользователя',
  })
  private: UserPrivate;

  @ApiProperty({
    example: {
      isBlocked: true,
      blockReason: 'Заблокирован',
      blockDate: '2023-12-20T15:09:55.204Z',
    },
    description: 'Информация о блокировке аккаунта',
  })
  blocked?: UserBlocked;

  // Notifications
  @ApiProperty({
    example: {
      email: true,
      telegram: true,
    },
    description: 'Настройки уведомлений',
  })
  notifications?: UserNotifications;

  constructor(model: User | any) {
    this.email = model.email;
    this._id = model._id;
    // Private
    this.private.password = model.private.password;
    this.private.createdAt = new Date().toISOString();
    this.private.telegramId = model.private.telegramId;
    // Other
    this.info = model.info;
    this.blocked = model.blocked;
    this.notifications = model.notifications;
  }
}
