export interface IFormatErrorObject {
  success: boolean;
  statusCode: number;
  errorCode: string;
  errorMessage?: string;
  devMessage?: string;
  payload?: any;
}
