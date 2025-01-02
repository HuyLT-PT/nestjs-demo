import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaDemo1Service {
  constructor(
    @Inject('KAFKA_DEMO_2') private readonly kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async kafkaDemo(heroId, dragonId) {
    const response = this.kafkaClient.send('message.to.kafka.demo.2', {
      heroId,
      dragonId,
    });

    response.subscribe({
      next: (data) => {
        console.log('Received response from demo 2:', data);
      },
      error: (err) => {
        console.error('Error receiving response:', err);
      },
    });
  }

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('message.to.kafka.demo.2');
  }
}
