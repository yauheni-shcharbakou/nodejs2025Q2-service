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
  private parseExceptionMessage(exception: Error): string {
    if (!(exception instanceof HttpException)) {
      return exception.message;
    }

    const response = exception.getResponse();

    if (typeof response !== 'object') {
      return response;
    }

    if (typeof response['message'] === 'string') {
      return response['message'];
    }

    if (Array.isArray(response['message'])) {
      return response['message'].join(', ');
    }

    return 'Unknown exception';
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseData: ResponseData = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: this.parseExceptionMessage(exception),
    };

    if (exception instanceof HttpException) {
      responseData.statusCode = exception.getStatus();
    }

    response.status(responseData.statusCode).json(responseData);
  }
}
