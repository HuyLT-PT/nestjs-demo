import { HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/constants';

export class CustomExceptionFactory extends HttpException {
  constructor(
    errorCode: ErrorCode,
    devMessage?: string,
    statusCode?: HttpStatus,
    payload?: any,
  ) {
    const errorObject: {
      errorCode: ErrorCode;
      statusCode: HttpStatus;
      devMessage?: string;
      payload?: any;
    } = {
      errorCode: errorCode,
      statusCode: statusCode || HttpStatus.BAD_REQUEST,
    };

    if (devMessage) errorObject.devMessage = devMessage;
    if (payload) errorObject.payload = payload;

    super(errorObject, errorObject.statusCode);
  }
}

export class Exception extends CustomExceptionFactory {
  constructor(
    errorCode: ErrorCode,
    devMessage?: string,
    statusCode?: HttpStatus,
    payload?: any,
  ) {
    super(errorCode, devMessage, statusCode, payload);
  }
}

export class BadRequest extends CustomExceptionFactory {
  constructor(devMessage?: string | any, payload?: any) {
    super(ErrorCode.INVALID_INPUT, devMessage, HttpStatus.BAD_REQUEST, payload);
  }
}

export class NotFound extends CustomExceptionFactory {
  constructor(devMessage?: string | any, payload?: any) {
    super(ErrorCode.NOT_FOUND, devMessage, HttpStatus.NOT_FOUND, payload);
  }
}

export class Forbidden extends CustomExceptionFactory {
  constructor(devMessage?: string | any, payload?: any) {
    super(ErrorCode.FORBIDDEN, devMessage, HttpStatus.FORBIDDEN, payload);
  }
}

export class Unauthorized extends CustomExceptionFactory {
  constructor(devMessage?: string | any, payload?: any) {
    super(ErrorCode.UNAUTHORIZED, devMessage, HttpStatus.UNAUTHORIZED, payload);
  }
}

export class UnprocessableEntity extends CustomExceptionFactory {
  constructor(devMessage?: string | any, payload?: any) {
    super(
      ErrorCode.INVALID_INPUT,
      devMessage,
      HttpStatus.UNPROCESSABLE_ENTITY,
      payload,
    );
  }
}
