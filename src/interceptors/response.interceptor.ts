import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ResponseModel } from "src/helpers/response";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseModel<T>> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseModel<T>> {
    
    //return next.handle().pipe( map(data => ({ statusCode: "00", message: "done",  data })));
    return next.handle().pipe( map( (data: any) => {
        return ( data && data.stack && data.message) ? { statusCode: "99", message: "done",  data } : { statusCode: "00", message: "done",  data }
        
    } ));
  }
}