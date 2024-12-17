import { HttpException, HttpExceptionOptions } from '@nestjs/common';
import { ErrorCode } from './errors.config';

interface Details {
  [key: string]: string | number;
}

export class CustomHttpException extends HttpException {
  private readonly _errorCode: ErrorCode;
  private readonly _details: Details;

  constructor(errorCode: ErrorCode, status: number, details: Details = {}, options?: HttpExceptionOptions) {
    super('', status, options);
    this._errorCode = errorCode;
    this._details = details;
  }

  get errorCode() {
    return this._errorCode;
  }

  get details() {
    return this._details;
  }
}
