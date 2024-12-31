import { Injectable, PipeTransform, PlainLiteralObject } from '@nestjs/common';
import { assignDataPaging } from '../utils';

@Injectable()
export class AssignDataPagingPipe implements PipeTransform {
  transform(value: PlainLiteralObject) {
    return assignDataPaging(value);
  }
}
