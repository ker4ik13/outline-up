import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { add } from 'date-fns';
import { Model, Types } from 'mongoose';
import { v4 } from 'uuid';
import { Token } from './token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private model: Model<Token>) {}

  // Создание refresh токена
  async getRefreshToken(
    userId: string | Types.ObjectId,
    agent: string,
  ): Promise<Token> {
    const _token = await this.model.findOne({
      userId,
      userAgent: agent,
    });

    const token = _token?.token ?? null;

    // Находим токен пользователя. Если он есть - возвращается измененный
    if (token) {
      return await this.model.findOneAndUpdate(
        {
          token,
        },
        {
          token: v4(),
          exp: add(new Date(), { months: 1 }),
          userAgent: agent,
          userId,
        },
        {
          upsert: true,
          new: true,
        },
      );
    }

    // Если нет - создается новый
    return this.model.create({
      token: v4(),
      exp: add(new Date(), { months: 1 }),
      userId,
      userAgent: agent,
    });
  }

  // Найти токен
  async findToken(refresh_token: string): Promise<Token> {
    return await this.model.findOne({ token: refresh_token });
  }

  // Удалить токен
  async deleteToken(refresh_token: string): Promise<Token> {
    return await this.model.findOneAndDelete({ token: refresh_token });
  }

  // Удалить все токены по ID пользователя
  async deleteAllTokensByUserId(userId: string) {
    return await this.model.deleteMany({ userId }, { new: true, multi: true });
  }
}
