import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaDemo2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
