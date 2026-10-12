import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import type { Response } from 'express';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor.js';

class ValidationException extends HttpException {
  constructor(readonly validationMessage: string) {
    super(validationMessage, 400);
  }
}

@Catch(ValidationException)
class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const body = exception.getResponse();
    const message =
      typeof body === 'string'
        ? body
        : typeof body === 'object' && body !== null && 'message' in body
          ? body.message
          : exception.validationMessage;
    response
      .status(400)
      .type('text/plain')
      .send(Array.isArray(message) ? message.join(', ') : String(message));
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationExceptionFilter());
  // mengaktfkan validasi global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints ?? {}),
        );
        return new ValidationException(messages.join(', '));
      },
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
