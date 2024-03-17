import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors();
  app.enableCors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  });

  const PORT = configService.get('PORT') || 3002;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Сервер для админ панели')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Cервер запущен на порту ${PORT}.`);
    console.log(`http://localhost:${PORT}`);

    if (+PORT === 3333) {
      console.log('Сервер запущен в режиме разработки.');
    }

    if (+PORT === 3001) {
      console.log('Сервер запущен в production режиме.');
    }

    if (+PORT !== 3001 && +PORT !== 3333) {
      console.log('Возможно путь к файлу .env указан неправильно.');
    }
  });
}
bootstrap();
