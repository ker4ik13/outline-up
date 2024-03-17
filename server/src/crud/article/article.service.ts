import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type Model } from 'mongoose';
import { generateMetaPage, type PageOptionsDto } from 'src/dtos/page';
import { Article } from './article.schema';
import type { CreateArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private model: Model<Article>) {}
  async create(createArticleDto: CreateArticleDto) {
    const newArticle: CreateArticleDto = {
      ...createArticleDto,
      createdAt: new Date().toISOString(),
      meta: JSON.parse(createArticleDto.meta),
    };

    return (await this.model.create(newArticle)).populate('author', {
      email: 1,
      info: 1,
      roles: 1,
    });
  }

  async findAll(pageOptions: PageOptionsDto) {
    if (pageOptions.search) {
      const queryResult = await this.model
        .find({
          $or: [
            { title: { $regex: pageOptions.search, $options: 'i' } },
            { description: { $regex: pageOptions.search, $options: 'i' } },
            { content: { $regex: pageOptions.search, $options: 'i' } },
          ],
        })
        .populate('author', {
          email: 1,
          info: 1,
          roles: 1,
        })
        .sort({ _id: pageOptions.order === 'ASC' ? 1 : -1 });

      return generateMetaPage(queryResult, queryResult, pageOptions);
    }

    const allItems = await this.model.find();

    const result = await this.model
      .find()
      .sort({ _id: pageOptions.order === 'ASC' ? 1 : -1 })
      .skip(pageOptions.skip)
      .limit(pageOptions.take)
      .populate('author', {
        email: 1,
        info: 1,
        roles: 1,
      });

    return generateMetaPage(result, allItems, pageOptions);
  }

  async checkSlug(slug: string) {
    const article = await this.model.findOne({ slug });

    if (article) {
      return {
        isValid: false,
      };
    }

    return { isValid: true };
  }

  async findOne(slug: string) {
    return await (
      await this.model.findOne({ slug }).exec()
    ).populate('author', {
      email: 1,
      info: 1,
      roles: 1,
    });
  }

  async update(slug: string, article: UpdateArticleDto) {
    const updatedArticle: UpdateArticleDto = {
      ...article,
      updatedAt: new Date().toISOString(),
    };

    return await this.model
      .findOneAndUpdate({ slug }, updatedArticle, {
        new: true,
      })
      .populate('author', {
        email: 1,
        info: 1,
        roles: 1,
      });
  }

  async remove(slug: string) {
    return await this.model.findOneAndDelete({ slug }, { new: true });
  }
}
