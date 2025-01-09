import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  public async findAllProducts() {
    return await this.prisma.product.findMany();
  }

  public async createProduct(data: { title: string; image: string }) {
    return await this.prisma.product.create({ data });
  }
  public async findProduct(productId: string) {
    return await this.prisma.product.findUnique({ where: { id: productId } });
  }
  public async updateProduct(
    data: { title?: string; image?: string; likes?: number },
    id: string,
  ) {
    return await this.prisma.product.update({ where: { id }, data });
  }
}
