import { Module } from '@nestjs/common';
import { CommonProviderService } from './common-provider.service';

@Module({
  providers: [CommonProviderService],
  exports: [CommonProviderService],
})
export class CommonProviderModule {}
