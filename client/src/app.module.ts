import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose"
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://certification:sQK7y5s9olkEYGWN@capacitybay1.rnocupk.mongodb.net/microservice_test?retryWrites=true&w=majority', {
      autoCreate:true
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
