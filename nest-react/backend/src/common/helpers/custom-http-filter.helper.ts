import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import _ from 'lodash';
import { ErrorCodesService } from '../services/error-codes.service';
import { CustomHttpException } from './custom.exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorCodesService: ErrorCodesService) {}

  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const details = exception.details;
    const message = _.isEmpty(details)
      ? this.errorCodesService.get(exception.errorCode)
      : this.errorCodesService.get(exception.errorCode, details);

    response.status(status).json({
      statusCode: status,
      errorCode: exception.errorCode,
      message,
      details,
    });
  }
}
