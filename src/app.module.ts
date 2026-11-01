import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SimpleLoggerMiddleware } from './middleware/simple-logger/simple-logger.middleware.js';

// Modules
import { AuthModule } from './auth/auth.module.js';
import { AuthorsModule } from './authors/authors.module.js';
import { BookAuthorsModule } from './book_authors/book_authors.module.js';
import { BooksModule } from './books/books.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { CustomerAddressesModule } from './customer_addresses/customer_addresses.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { MembersModule } from './members/members.module.js';
import { OrderItemsModule } from './order_items/order_items.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { PublishersModule } from './publishers/publishers.module.js';
import { ShipmentsModule } from './shipments/shipments.module.js';

// Entities
import { Author } from './authors/entities/author.entity.js';
import { BookAuthor } from './book_authors/entities/book_author.entity.js';
import { Book } from './books/entities/book.entity.js';
import { Category } from './categories/entities/categories.entity.js';
import { CustomerAddress } from './customer_addresses/entities/customer_address.entity.js';
import { Customer } from './customers/entities/customer.entity.js';
import { OrderItem } from './order_items/entities/order_item.entity.js';
import { Order } from './orders/entities/orders.entiity.js';
import { Payment } from './payments/entities/payment.entity.js';
import { Publisher } from './publishers/entities/publisher.entity.js';
import { Shipment } from './shipments/entities/shipment.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [
          Author,
          BookAuthor,
          Book,
          Category,
          CustomerAddress,
          Customer,
          OrderItem,
          Order,
          Payment,
          Publisher,
          Shipment,
        ],
        synchronize: true, // otomatis buat/update tabel — matikan di production
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),
    // Feature modules
    AuthModule,
    AuthorsModule,
    BookAuthorsModule,
    BooksModule,
    CategoriesModule,
    CustomerAddressesModule,
    CustomersModule,
    MembersModule,
    OrderItemsModule,
    OrdersModule,
    PaymentsModule,
    PublishersModule,
    ShipmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleLoggerMiddleware).forRoutes('*');
  }
}
