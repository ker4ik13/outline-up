import { CurrentUser } from '@auth/decorators';
import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { multerOptions } from 'src/config';
import { PageOptionsDto } from 'src/dtos/page';
import { UserRoles } from 'src/types/user';
import { ArticleService } from './article.service';
import type { CreateArticleDto } from './dto/create-article.dto';
import type { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() pageOptions: PageOptionsDto) {
    return this.articleService.findAll(new PageOptionsDto(pageOptions));
  }

  @Post()
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin, UserRoles.Editor)
  @UseInterceptors(FileInterceptor('preview', multerOptions))
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() preview: Express.Multer.File,
    @CurrentUser('_id') userId: string,
  ) {
    return this.articleService.create({
      ...createArticleDto,
      preview: preview.filename,
      author: new Types.ObjectId(userId),
    });
  }

  @Get('check/:slug')
  checkSlug(@Param('slug') slug: string) {
    return this.articleService.checkSlug(slug);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articleService.findOne(slug);
  }

  @Patch(':slug')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin, UserRoles.Editor)
  update(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(slug, updateArticleDto);
  }

  @Delete(':slug')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin, UserRoles.Editor)
  remove(@Param('slug') slug: string) {
    return this.articleService.remove(slug);
  }
}
