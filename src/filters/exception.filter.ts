import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ResponseData = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseData: ResponseData = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };

    if (exception instanceof HttpException) {
      responseData.statusCode = exception.getStatus();
      responseData.message = exception.getResponse();

      response.status(responseData.statusCode).json(responseData);
      return;
    }

    response.status(responseData.statusCode).json(responseData);
  }
}
