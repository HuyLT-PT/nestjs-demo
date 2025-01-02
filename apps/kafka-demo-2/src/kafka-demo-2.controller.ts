import { Controller, Get } from '@nestjs/common';
import { KafkaDemo2Service } from './kafka-demo-2.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class KafkaDemo2Controller {
  constructor(private readonly kafkaDemo2Service: KafkaDemo2Service) {}

  @Get()
  getHello(): string {
    return this.kafkaDemo2Service.getHello();
  }

  @MessagePattern('message.to.kafka.demo.2')
  kafkaDemo(@Payload() message: any, @Ctx() context: KafkaContext): any {
    console.log('_______________', { message, topic: context.getTopic() });

    const realm = 'Nest';
    const dragonId = message.dragonId;
    const heroId = message.heroId;
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];

    return {
      headers: {
        kafka_nestRealm: realm,
      },
      key: heroId,
      value: items,
    };
  }
}
