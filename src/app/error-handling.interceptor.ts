import { HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpResponse,
  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToasterService } from './services/toaster.service';

export class ErrorHandlerInterceptor  implements HttpInterceptor {
  constructor(public toaster: ToasterService) { }

showDanger(dangerTpl: any) {
  this.toaster.show(dangerTpl, { classname: 'bg-danger text-light', delay: 3000 });
}
  
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
return next.handle(request)
        .pipe(
          catchError( (error: HttpErrorResponse) => {   
            console.log("error =>");
             let errMsg = '';
           
            
             // Client Side Error
             if (error.error instanceof ErrorEvent) {		
               errMsg = `Error: ${error.error.message}`;
               this.showDanger(errMsg)
             } 
             else {  // Server Side Error
               errMsg = `Error Code: ${error.status},  Message: ${error.message}`;

               switch (error.status) {
                case 400: {
               this.showDanger("Bad Request")

                  break ;
                }
                case 401: {
               this.showDanger("Unauthorized: please login")

                  break ;
                }
                case 403: {
               this.showDanger("Forbidden")

                  break ;
                }
                case 404: {
               this.showDanger("Not Found")

                  break ;
                }
                case 422: {
               this.showDanger("Unprocessable Entity")

                  break ;
                }
                case 500: {
               this.showDanger("Internal Server Error")
                  
                  break ;
                }
                default: {
              
                }
             }
               
             }
             // return an observable
             return throwError(errMsg);
           })
        )
}
} 