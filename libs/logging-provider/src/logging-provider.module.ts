import { Module } from '@nestjs/common';
import { LoggingProviderService } from './logging-provider.service';

@Module({
  providers: [LoggingProviderService],
  exports: [LoggingProviderService],
})
export class LoggingProviderModule {}
