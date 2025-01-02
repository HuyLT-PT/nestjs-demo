import { Controller, Get, Inject } from '@nestjs/common';
import { KafkaDemo1Service } from './kafka-demo-1.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class KafkaDemo1Controller {
  constructor(private readonly kafkaDemo1Service: KafkaDemo1Service) {}

  @Get()
  getHello(): string {
    return this.kafkaDemo1Service.getHello();
  }

  @MessagePattern('message.to.kafka.demo.1')
  kafkaDemo(@Payload() message: any, @Ctx() context: KafkaContext): any {
    console.log('_______________', { message, topic: context.getTopic() });
    const realm = 'Nest';
    const dragonId = message.dragonId;
    const heroId = message.heroId;
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];

    this.kafkaDemo1Service.kafkaDemo(heroId, dragonId);
    return {
      headers: {
        kafka_nestRealm: realm,
      },
      key: heroId,
      value: items,
    };
  }
}
