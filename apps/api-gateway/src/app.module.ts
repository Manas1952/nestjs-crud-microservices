import { Module } from "@nestjs/common";
import { APIGatewayModule } from "./api-gateway.module";

@Module({
  imports: [ APIGatewayModule ],
})
export class AppModule {}
