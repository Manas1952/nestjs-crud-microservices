import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from 'rabbitmq.options';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('RMQ_CLIENT')
    private readonly rmqClient: ClientProxy
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findAll() {
    console.log("getUsers");
    this.rmqClient.send({ cmd: 'GETTING_USERS' }, { 'key': 'value' });
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
