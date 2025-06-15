import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { LoggingService } from './logging.service';
import { Observable, switchMap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const controller = context.getClass();

    request.controller = controller.name;

    const body = request.body;
    const query = request.query;
    const url = request.url;
    const method = request.method;

    const requestLog = `${method} ${url}\nRequest: ${JSON.stringify({ body, query }, null, 2)}`;

    fromPromise(
      this.loggingService.debug(requestLog, controller.name),
    ).subscribe();

    return next.handle().pipe(
      switchMap((response) => {
        const responseData =
          typeof response === 'object'
            ? JSON.stringify(response, null, 2)
            : response?.toString();

        const responseLog = `${method} ${url}\nResponse: ${responseData}`;

        return fromPromise(
          this.loggingService.debug(responseLog, controller.name),
        ).pipe(switchMap(() => fromPromise(Promise.resolve(response))));
      }),
    );
  }
}
