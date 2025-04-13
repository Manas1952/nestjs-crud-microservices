import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductServiceService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  create(product: Partial<Product>) {
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  updateStock(id: number, stock: number) {
    return this.productRepo.update(id, { stock });
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
