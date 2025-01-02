import { Test, TestingModule } from '@nestjs/testing';
import { KafkaDemo2Controller } from './kafka-demo-2.controller';
import { KafkaDemo2Service } from './kafka-demo-2.service';

describe('KafkaDemo2Controller', () => {
  let kafkaDemo2Controller: KafkaDemo2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KafkaDemo2Controller],
      providers: [KafkaDemo2Service],
    }).compile();

    kafkaDemo2Controller = app.get<KafkaDemo2Controller>(KafkaDemo2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(kafkaDemo2Controller.getHello()).toBe('Hello World!');
    });
  });
});
