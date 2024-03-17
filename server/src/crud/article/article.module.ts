import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions, options } from 'src/config';
import { ArticleController } from './article.controller';
import { Article, ArticleSchema } from './article.schema';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
    JwtModule.registerAsync(options()),
    MulterModule.register(multerOptions),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
