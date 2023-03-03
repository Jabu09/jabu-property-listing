import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: environment === 'production',
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Property listing API')
    .setDescription('Documentation for property listing')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: '',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
