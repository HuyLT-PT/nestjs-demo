import { Module } from '@nestjs/common';
import { ConfigProviderService } from './config-provider.service';

@Module({
  providers: [ConfigProviderService],
  exports: [ConfigProviderService],
})
export class ConfigProviderModule {}
