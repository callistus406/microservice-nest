import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService,
        @Inject("PRODUCT_SERVICE") private readonly client:ClientProxy
    ) { }
    
    @Get()
    public async products() {
        this.client.emit("hello","hello form admin microservice")
        return this.productService.findAllProducts()
    }
    
    @Post()
    public async create(@Body() data:{title:string,image:string}) {
        return this.productService.createProduct(data)
    }
    @Get(":id")
    public async findProduct(@Param("id") id:string) {
        return this.productService.findProduct(id)
    }
    @Patch(":id")
    public async updateProduct(@Param("id") id:string,@Body() data:{title?:string,image?:string,likes?:number}) {
        return this.productService.updateProduct(data,id)
    }
}
