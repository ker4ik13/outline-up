import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema({
  collection: 'tokens',
})
export class Token {
  @Prop({
    unique: true,
    required: true,
  })
  token: string;

  @Prop({
    required: true,
  })
  exp: Date;

  @Prop({
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop()
  userAgent: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
