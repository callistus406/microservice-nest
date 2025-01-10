import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  public async all() {
    return await this.productModel.find();
  }

  public async findProduct(id: String) {
    return await this.productModel.findOne({ id }).exec();
  }
  public async createProduct(product: {
    title: string;
    image: string;
    likes: number;
    id: string;
  }) {
    return await this.productModel.create({ ...product });
  }

  public async findById(id: string) {
   return  await this.productModel.findOne({ id });
  }

  public async updateProduct(id: string, product: any) {
    await this.productModel.findOneAndUpdate(
      { id },
      { title: product.title, image: product.image, likes: product.likes },
      { new: true },
    );
  }

  public async deleteProduct(id: string) {
    const response = await this.productModel.findOneAndDelete({ id });
    return response
  }

  public async likeProduct(id: string, likes: number) {
    console.log({id,likes})
    const response = await this.productModel.findOneAndUpdate({ id },{likes},{new:true});
    return response
  }
}
