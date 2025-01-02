import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('KAFKA_DEMO_1') private readonly kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    const result = this.kafkaClient.send('message.to.kafka.demo.1', {
      heroId: 1,
      dragonId: 2,
    });

    result.subscribe({
      next: (data) => {
        console.log('Received response from demo 1:', data);
      },
      error: (err) => {
        console.error('Error receiving response:', err);
      },
    });

    console.log('send done');
    return 'Hello World!';
  }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('message.to.kafka.demo.1');
  }
}
