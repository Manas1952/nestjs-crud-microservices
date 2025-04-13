import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { of } from 'rxjs';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: "POST" })
  create(body: any) {
    return this.userService.create(body);
  }

  @MessagePattern({ cmd: "PUT" })
  update(body: any) {
    return this.userService.update(Number(body.id), body.user);
  }

  @MessagePattern({ cmd: "DELETE" })
  remove(body: any) {
    return this.userService.remove(Number(body.id));
  }

  @MessagePattern({ cmd: "GET" })
  getUsers(body: any) {
    if (body.id) {
      return this.userService.findOne(Number(body.id));
    }
    return this.userService.findAll();
    // return of("pong"); ??
  }
}
