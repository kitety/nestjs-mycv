import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): unknown;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run something before a request is handled
    // by the request handler
    // console.log('I am running before a request is handled', context);

    //  handled
    return next.handle().pipe(
      map((data: any) => {
        // run something before the response is sent out
        // console.log('I am running before the response is sent out', data);
        return plainToInstance(this.dto, data, {
          // 去除无关的属性
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
