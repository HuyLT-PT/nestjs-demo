import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import { IFormatErrorObject } from './interface';
import { CommonLanguage, ErrorCode, ErrorMessages } from '../enums/constants';

/**
 * Format response body error object
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    Object.assign(exception, {
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        ip: request.ip,
      },
    });

    // Extract language from request
    const language =
      request.headers['accept-language']?.split(',')[0] || CommonLanguage.EN;

    // Log error
    const { statusCode, ...errorObject } = formatErrorObject(
      exception,
      language as CommonLanguage,
    );
    response.status(statusCode).json(errorObject);
  }
}

export function formatErrorObject(
  exception: HttpException | any,
  language = CommonLanguage.EN,
) {
  const errorObj: IFormatErrorObject = {
    success: false,
    statusCode: exception.status || HttpStatus.BAD_REQUEST,
    errorCode: ErrorCode.UNKNOWN_ERROR,
  };

  console.error(exception instanceof HttpException);
  if (exception instanceof HttpException) {
    const data = exception.getResponse() as any;

    if (data?.error === 'Not Found') {
      return {
        success: false,
        statusCode: data?.status || HttpStatus.NOT_FOUND,
        errorCode: ErrorCode.NOT_FOUND,
        errorMessage:
          ErrorMessages?.[language]?.[ErrorCode.NOT_FOUND] || data?.message,
      };
    }

    if (data?.error === 'Forbidden') {
      return {
        success: false,
        statusCode: data?.status || HttpStatus.FORBIDDEN,
        errorCode: ErrorCode.FORBIDDEN,
        errorMessage:
          ErrorMessages?.[language]?.[HttpStatus.FORBIDDEN] || data?.message,
      };
    }

    const extraData = pick(data, [
      'errorCode',
      'statusCode',
      'devMessage',
      'payload',
      'errorMessage',
    ]);

    Object.assign(errorObj, extraData);

    if (data === 'ThrottlerException: Too Many Requests') {
      Object.assign(errorObj, {
        errorCode: ErrorCode.THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED,
        devMessage: 'Too Many Requests',
      });
    }
  }

  if (!errorObj?.errorMessage) {
    const msgFromPayload = errorObj?.payload?.errorMessage;
    const msgFromErrorCode = ErrorMessages?.[language]?.[errorObj.errorCode];
    const defaultMsg = errorObj.errorCode;
    errorObj.errorMessage = msgFromPayload || msgFromErrorCode || defaultMsg;
  }

  return errorObj;
}
