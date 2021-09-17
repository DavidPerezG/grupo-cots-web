import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


  constructor(private authService:AuthService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    const tokenizeRequest = req.clone({
      setHeaders:{
        'x-access-token': `Bearer ${this.authService.getToken()}`, 
      }
      // headers: req.headers.set('x-access-token', this.authService.getToken()),

    })
    console.log(tokenizeRequest)
    console.log(this.authService.getToken())

    return next.handle(tokenizeRequest)
  }

  
}


