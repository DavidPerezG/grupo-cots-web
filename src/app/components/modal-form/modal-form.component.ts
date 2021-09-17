import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersApiService } from 'src/app/services/users-api.service';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private router: Router,
    public modal: NgbModal, 
    public userapiService: UsersApiService, 
    private menuAdmin: MenuAdminComponent, 
    private formBuilder: FormBuilder) { 
      this.buildForm();
    }

  ngOnInit(): void {

  }

  openModal(contenido: any){
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
    this.addAdmin(this.form)
  }

  addAdmin(form: FormGroup){
    console.log(form.value);
    this.userapiService.createAdmin(form.value).subscribe(
      res => {
        this.menuAdmin.getUsers();
        form.reset();
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
