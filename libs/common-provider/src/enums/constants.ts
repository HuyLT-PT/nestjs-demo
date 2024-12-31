export enum ErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED = 'THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED',
}

export enum CommonLanguage {
  EN = 'en',
  VI = 'vi',
  JA = 'ja',
}

export const ErrorMessages: Record<
  CommonLanguage,
  Record<ErrorCode, string>
> = {
  [CommonLanguage.EN]: {
    [ErrorCode.UNKNOWN_ERROR]: 'Unknown error occurred',
    [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
    [ErrorCode.UNAUTHORIZED]: 'Unauthorized access',
    [ErrorCode.FORBIDDEN]: 'Forbidden access',
    [ErrorCode.NOT_FOUND]: 'Resource not found',
    [ErrorCode.THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED]:
      'The allowed number of calls has been exceeded',
  },
  [CommonLanguage.VI]: {
    [ErrorCode.UNKNOWN_ERROR]: 'Unknown error occurred',
    [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
    [ErrorCode.UNAUTHORIZED]: 'Unauthorized access',
    [ErrorCode.FORBIDDEN]: 'Forbidden access',
    [ErrorCode.NOT_FOUND]: 'Resource not found',
    [ErrorCode.THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED]:
      'The allowed number of calls has been exceeded',
  },
  [CommonLanguage.JA]: {
    [ErrorCode.UNKNOWN_ERROR]: 'Unknown error occurred',
    [ErrorCode.INVALID_INPUT]: 'Invalid input provided',
    [ErrorCode.UNAUTHORIZED]: 'Unauthorized access',
    [ErrorCode.FORBIDDEN]: 'Forbidden access',
    [ErrorCode.NOT_FOUND]: 'Resource not found',
    [ErrorCode.THE_ALLOWED_NUMBER_OF_CALLS_HAS_BEEN_EXCEEDED]:
      'The allowed number of calls has been exceeded',
  },
};
export const ValuesImportant = [];
