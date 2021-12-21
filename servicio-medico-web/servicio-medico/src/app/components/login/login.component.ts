import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loginmessage!: string

  

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', []]
    })
  }

  signIn(event: Event) {
    event.preventDefault();


    this.authService.signIn(this.form.value)
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
  
  get emailField(){
    return this.form.get('email')
  }

  get emailFieldIsValid(){
    return this.emailField?.valid;
  }


}
