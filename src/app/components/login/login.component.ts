import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginmessage!: string

  user = {
    email: '',
    password: '',
  }

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.user)
    .subscribe(
      (res:any) =>{
        console.log(res)
        localStorage.setItem('token', res.token);
        localStorage.setItem('id-user', res.iduser);
        this.router.navigate(['/menu'])
      },
      err => {
        this.loginmessage = err.error.message
        console.log(this.loginmessage)
        console.log(err)
      }
    )
  }

  validationState(){
    return this.loginmessage
  }
}
