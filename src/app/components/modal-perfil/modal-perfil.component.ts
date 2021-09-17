import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersApiService } from 'src/app/services/users-api.service';
import { User } from 'src/app/models/user';
import { UserUpdate } from 'src/app/models/user';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent implements OnInit {

  form!: FormGroup;
 

  emptyUser: UserUpdate = {
    name: '',
    email: '',
    password: '',
  }
  myUser!: User
  myId = localStorage.getItem('id-user');


  constructor(
    public modal: NgbModal, 
    public userapiService: UsersApiService, 
    private menuAdmin: MenuAdminComponent,
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
    this.form.valueChanges.subscribe(
      value => { console.log(value); }
    );
  }

  ngOnInit(): void {
    this.getMyUser() 
  }

  openModal(contenido: any){
    this.getMyUser()
    this.form.get('name')?.setValue(this.myUser.name);
    this.form.get('email')?.setValue(this.myUser.email);
    this.modal.open(contenido);
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      name : ['', []],
      email : ['', [Validators.email]],
      password : ['', []]
    });
  }

  saveForm(event: Event){
    event.preventDefault();
    
    this.updateUser(this.form)
  }

  getMyUser(){
    const myData = this.userapiService.getUser(this.myId!).subscribe(
      res => {
        console.log(res);
        this.myUser = res;
      },
      err => console.log(err)
    )

    console.log(myData);
  }

  updateUser(form: FormGroup){
    this.emptyUser.name = form.value.name;
    this.emptyUser.email = form.value.email;

    if(form.value.password != ''){
      this.emptyUser.password = form.value.password;
    }
    
    console.log(this.emptyUser)
    this.userapiService.updateAdmin(this.myId!, this.emptyUser).subscribe(
      res => {
        console.log(res);
        this.menuAdmin.getUsers();
      },
      err => console.log(err)
    )
    
  }
  
  get nameField(){
    return this.form.get('name')
  }

  get emailField(){
    return this.form.get('email')
  }

  get passwordField(){
    return this.form.get('password')
  }

  get emailFieldIsValid(){
    return this.emailField?.valid;
  }

  get emailFieldIsInvalid(){
    return this.emailField?.invalid
  }
  

}
