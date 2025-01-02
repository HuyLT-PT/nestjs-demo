import { Module } from '@nestjs/common';
import { KafkaDemo2Controller } from './kafka-demo-2.controller';
import { KafkaDemo2Service } from './kafka-demo-2.service';

@Module({
  imports: [],
  controllers: [KafkaDemo2Controller],
  providers: [KafkaDemo2Service],
})
export class KafkaDemo2Module {}
