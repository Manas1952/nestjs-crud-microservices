import { Controller } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductServiceController {
  constructor(private readonly productService: ProductServiceService) {}

    @MessagePattern({ cmd: "POST" })
    create(body: any) {
      return this.productService.create(body);
    }
  
    @MessagePattern({ cmd: "PUT" })
    update(body: any) {
      return this.productService.update(Number(body.id), body.user);
    }
  
    @MessagePattern({ cmd: "DELETE" })
    remove(body: any) {
      return this.productService.remove(Number(body.id));
    }
  
    @MessagePattern({ cmd: "GET" })
    getUsers(body: any) {
      if (body.id) {
        return this.productService.findOne(Number(body.id));
      }
      return this.productService.findAll();
      // return of("pong"); ??
    }

    @EventPattern('GETTING_USERS')
    async handleMessage(data: Record<string, any>) {
      console.log('Received message:', data);
    }
}
