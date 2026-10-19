import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BooksModule } from './books/books.module.js';
import { MembersModule } from './members/members.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { AuthModule } from './auth/auth.module.js';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SimpleLoggerMiddleware } from './middleware/simple-logger/simple-logger.middleware.js';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    BooksModule,
    MembersModule,
    CategoriesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DB_PORT: Joi.number().default(5432),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory : (ConfigService : ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get<string>('DB_HOST'),
        port:ConfigService.get<number>('DB_PORT'),
        username:ConfigService.get<string>('DB_USERNAME'),
        password:ConfigService.get<string>('DB_PASSWORD'),
        database:ConfigService.get<string>('DB_DATABASE'),


        autoLoadEntities: true,

        synchronize: ConfigService.get<string>('NODE_ENV') === 'development'
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
}
}
