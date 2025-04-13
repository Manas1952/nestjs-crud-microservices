import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { map } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  
  constructor(
    @Inject("USER_SERVICE") private readonly clientServiceA: ClientProxy,
    @Inject("PRODUCT_SERVICE") private readonly clientServiceB: ClientProxy
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // body should be a DTO
  callUserService1(cmd : string, body: any) {
    const pattern = { cmd }; 
    return this.clientServiceA
      //.send<DTO or model>(pattern, body)
      .send(pattern, body)
      .pipe(
        map((response: string) => ({ response, }))
      );
  }

  callUserService2(cmd: string, id: string, user: any) {
    const pattern = { cmd };
    return this.clientServiceA
      .send(pattern, { id, user })
      // .pipe() or .subscribe()?
      .pipe(
        map((response: string) => ({ response, }))
      );
  }

  callProductService1(cmd: string, body: any) {
    const pattern = { cmd };
    return this.clientServiceB
      .send(pattern, body)
      .pipe(
        map((response: string) => ({ response, }))
      );
  }

  callProductService2(cmd: string, id: string, user: any) {
    const pattern = { cmd };
    return this.clientServiceB
      .send(pattern, { id, user })
      .pipe(
        map((response: string) => ({ response, }))
      );
  }
}
