import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from '@app/common-provider/interceptors/request.interceptor';
import { TransformResponseInterceptor } from '@app/common-provider/interceptors/response.interceptor';
import { LoggerMiddleware } from '@app/common-provider/middlewares/logger.middlerware';
import { WhileListIpMiddleware } from '@app/common-provider/middlewares/ip-whilelist.midderware';
import { AllExceptionsFilter } from '@app/common-provider/filters/exceptions.filter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_DEMO_1',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-demo-1',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-demo-1-consumer',
          },
          producer: {
            createPartitioner: Partitioners.LegacyPartitioner,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(WhileListIpMiddleware).forRoutes('*');
  }
}
