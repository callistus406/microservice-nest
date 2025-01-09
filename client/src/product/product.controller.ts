import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import {EventPattern} from "@nestjs/microservices"
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {
        
    }

    @Get()
    public async findAll() {
        return this.productService.all();

    }
    @EventPattern("hello")
    public async hello(data: string) {
        console.log(data)
        
    }
}
