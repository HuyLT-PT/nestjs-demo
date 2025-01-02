import { Module } from '@nestjs/common';
import { KafkaDemo1Controller } from './kafka-demo-1.controller';
import { KafkaDemo1Service } from './kafka-demo-1.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_DEMO_2',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-demo-2',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-demo-2-consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [KafkaDemo1Controller],
  providers: [KafkaDemo1Service],
})
export class KafkaDemo1Module {}
