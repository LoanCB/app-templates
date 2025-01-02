import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import _ from 'lodash';
import { ErrorCodesService } from '../services/error-codes.service';
import { CustomHttpException, CustomHttpExceptionResponse } from './custom.exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorCodesService: ErrorCodesService) {}

  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const details = _.isEmpty(exception.details) ? null : exception.details;
    const message = _.isEmpty(details)
      ? this.errorCodesService.get(exception.errorCode)
      : this.errorCodesService.get(exception.errorCode, details);

    const responseBody: CustomHttpExceptionResponse = {
      statusCode: status,
      errorCode: exception.errorCode,
      message,
    };

    if (details) {
      responseBody.details = details;
    }

    response.status(status).json(responseBody);
  }
}
