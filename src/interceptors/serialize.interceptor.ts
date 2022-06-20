import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
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
        return plainToClass(UserDto, data, {
          // 去除无关的属性
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
