import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from './interface';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformResponseInterceptor.name);
  intercept(c: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    this.logger.log('Transform Response');
    return next.handle().pipe(
      map((data) => {
        if (!data?.paging) return { data: data || null };

        delete data.paging;
        return data;
      }),
    );
  }
}
