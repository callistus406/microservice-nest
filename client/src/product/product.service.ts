import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel:Model<ProductDocument>){}

    public async all() {
       return await this.productModel.find()
    }

    public async findProduct(id:String) {
      return await   this.productModel.findOne({id}).exec()
    }


}
