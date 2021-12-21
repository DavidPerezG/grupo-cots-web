import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  constructor(private authService:AuthService) { }

  public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    if (req.headers.get('IgnoreInterceptor') !== undefined && req.headers.get('IgnoreInterceptor') != null) {
      const newHeaders = req.headers.delete('IgnoreInterceptor')
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest);
     }
     else{
      const tokenizeRequest = req.clone({
        setHeaders:{
          'x-access-token': `Bearer ${this.authService.getToken()}`, 
        }
      })
      return next.handle(tokenizeRequest)  
    }
    
  } 
}