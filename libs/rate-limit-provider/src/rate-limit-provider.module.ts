import { Module } from '@nestjs/common';
import { RateLimitProviderService } from './rate-limit-provider.service';

@Module({
  providers: [RateLimitProviderService],
  exports: [RateLimitProviderService],
})
export class RateLimitProviderModule {}
