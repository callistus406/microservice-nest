import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
 