import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  public async findAll() {
    return this.productService.all();
  }
  @EventPattern('hello')
  public async hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  public async createProduct(product: any) {
    console.log(product);
    const response = await this.productService.createProduct(product);

    return response;
  }

  @EventPattern('product_updated')
  public async updateProduct(product: any) {
    console.log(product);

    const response = await this.productService.updateProduct(product.id, {
      title: product.title,
      image: product.image,
      likes: product.likes,
    });

    return response;
  }

  @EventPattern('product_deleted')
  public async deleteProduct(productId: string) {
    const response = await this.productService.deleteProduct(productId);

    return response;
  }

  @Post(':id/like')
  public async likeProduct(@Param('id') id: string) {
    const res = await this.productService.findById(id);

    this.httpService
      .post(`http://localhost:8000/products/${id}/like`, {})
      .subscribe((res) => {
        console.log(res.data);
      });

    const like = res.likes +1 ;
    const response = await this.productService.likeProduct(id, like);

    return response;
  }
    
  @Get(':id')
  public async fetchProduct(@Param('id') id: string) {
    const res = await this.productService.findById(id);

    return res;
  }
}
