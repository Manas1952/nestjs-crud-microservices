import { All, Body, Controller, Get, Param, Req } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  
  @All("users")
  // create DTO for body
  //name controler finction which does create, and get all users
  users(@Req() request: Request, @Body() body: any) {
    return this.apiGatewayService.callUserService1(request.method, body);
  }
  
  @All("users/:id")
  user(@Param('id') id: string, @Req() req: Request, @Body() body: any) {
    return this.apiGatewayService.callUserService2(req.method, id, body);
  }
  
  @All("products")
  products(@Req() request: Request, @Body() body: any) {
    return this.apiGatewayService.callProductService1(request.method, body);
  }
  
  @All("products/:id")
  product(@Param('id') id: string, @Req() req: Request, @Body() body: any) {
    return this.apiGatewayService.callProductService2(req.method, id, body);
  }
  
  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }
}
