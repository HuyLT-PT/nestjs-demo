import { Test, TestingModule } from '@nestjs/testing';
import { KafkaDemo1Controller } from './kafka-demo-1.controller';
import { KafkaDemo1Service } from './kafka-demo-1.service';

describe('KafkaDemo1Controller', () => {
  let kafkaDemo1Controller: KafkaDemo1Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KafkaDemo1Controller],
      providers: [KafkaDemo1Service],
    }).compile();

    kafkaDemo1Controller = app.get<KafkaDemo1Controller>(KafkaDemo1Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(kafkaDemo1Controller.getHello()).toBe('Hello World!');
    });
  });
});
