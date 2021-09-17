import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  signIn(user: any){
    return this.http.post(this.URL + '/auth/signin', user);
  }

  signUp(user: any) {
    return this.http.post(this.URL + '/auth/signup', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');

  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('id-user')
    this.router.navigate(['/login']);

  }
}
