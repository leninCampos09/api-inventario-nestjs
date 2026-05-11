import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder().setTitle('API Inventario').setVersion('1.0').build();
  try {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  } catch (err) {
    // If Swagger fails (version mismatch), log and continue without docs
    // eslint-disable-next-line no-console
    if (err instanceof Error) {
      console.warn('Swagger setup failed:', err.message);
    } else {
      console.warn('Swagger setup failed:', err);
    }
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
