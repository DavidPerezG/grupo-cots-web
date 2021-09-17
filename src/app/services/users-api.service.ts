import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserUpdate } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private URL = 'http://localhost:3000/api';

  selectedUser: User = {
    name: '',
    email: '',
    password: '',
    roles: ['']
  };
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get<any>(this.URL + '/users/admins');

  }

  getUser(id: string){
    return this.http.get<any>(this.URL + '/users/' + id);
  }

  createAdmin(user: User){
    user.password = "grupo-cots2021";
    user.roles = ['admin'];
    console.log(user)
    return this.http.post(this.URL + '/users', user);
  }

  updateAdmin(id: string, user: UserUpdate){
    return this.http.put(this.URL + '/users/' + id, user)
  }

  deleteAdmin(id: string){
    return this.http.delete(this.URL + '/users/' + id);
  }
}
