import { NestFactory } from '@nestjs/core';
import { KafkaDemo2Module } from './kafka-demo-2.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    KafkaDemo2Module,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
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
  );
  await app.listen();
}
bootstrap();
