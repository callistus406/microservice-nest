import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
import { emit } from 'process';

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
        const response = await this.productService.createProduct(data)

        this.client.emit("product_created",response)
        return response
    }
    @Get(":id")
    public async findProduct(@Param("id") id: string) {
        
        return this.productService.findProduct(id)
    }
    @Patch(":id")
    public async updateProduct(@Param("id") id:string,@Body() data:{title?:string,image?:string,likes?:number}) {
        const response = await this.productService.updateProduct(data, id)
        
        this.client.emit("product_updated", {...response,id})
        return response;
    }
    @Delete(":id")
    public async deleteProduct(@Param("id") id: string) {
        
        await this.productService.deleteProduct(id)

        this.client.emit("delete_product",id)
    }

    // @Post(":id")
    // public async likeProduct(@Param("id") id: string) {
        
    //     await this.productService.likeProduct(id)

    //     this.client.emit("like_product",id)
    // }


  @Post(":id/like")
  public async likeProduct( @Param("id") id: string) {
    // const res = await this.productService.likeProduct(id);

  
    //   const like = res.likes++;
      const response = await this.productService.likeProduct(id);

      return response;
   
  }
}
