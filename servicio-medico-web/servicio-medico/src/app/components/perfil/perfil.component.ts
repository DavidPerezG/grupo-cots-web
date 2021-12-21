import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  url ="../../../assets/images/camera-png.png";
  public archivos: any;
  form!: FormGroup;
  myUser!: Patient

  constructor(
    private formBuilder: FormBuilder,
    public patientapiService: PatientsService,
    private cloudinaryService: CloudinaryService
  ) { 
    this.getMyUser();
    
  }

  ngOnInit(): void {
    
    
  }

  getMyUser(){
    const myData = this.patientapiService.getMyUser().subscribe(
      res => {
        console.log(res);
        this.myUser = res;
        if(this.myUser.employee_photo) this.url = this.myUser.employee_photo!;
        console.log(this.url);

        this.buildForm();
      },
      err => console.log(err)
    )
    console.log(myData);
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      curp : [this.myUser.curp, []],
      rfc : [this.myUser.rfc, []],
      employee_photo : [this.myUser.employee_photo, []],
      first_name : [this.myUser.first_name, [Validators.required]],
      middle_name : [this.myUser.middle_name, []],
      paternal_surname : [this.myUser.paternal_surname, []],
      maternal_surname : [this.myUser.maternal_surname, [Validators.required]],
      marital_status : [this.myUser.marital_status, []],
      gender : [this.myUser.gender, [Validators.required]],
      date_birth : [this.myUser.date_birth, [Validators.required]],
      age : [this.myUser.age, [Validators.required]],
      place_birth : [this.myUser.place_birth, []],
      eye_color : [this.myUser.eye_color, []],
      hair_color : [this.myUser.hair_color, []],
      weight : [this.myUser.weight, [Validators.required]],
      nationality : [this.myUser.nationality, []],
      height : [this.myUser.height, [Validators.required]],
      religion : [this.myUser.religion, []],
      name_emergency : [this.myUser.name_emergency, [Validators.required]],
      telephone_emergency : [this.myUser.telephone_emergency, [Validators.required]],
      cellphone_emergency : [this.myUser.cellphone_emergency, [Validators.required]],
      address : [this.myUser.address, []],
      email : [this.myUser.email, [Validators.required, Validators.email]],
      donor : [this.myUser.donor, []],
      name_father : [this.myUser.name_father, [Validators.required]],
      name_mother : [this.myUser.name_mother, [Validators.required]],
      password : ['', []],
    }, { updateOn: 'submit' });
  }

  saveForm(event: Event){
    event.preventDefault();
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.checkPatient(this.form)
    }
  }

  checkPatient(form: FormGroup){
    if (this.archivos !== undefined){
      const formularioDeDatos = new FormData();
      formularioDeDatos.append('file', this.archivos[0]);
      formularioDeDatos.append('upload_preset', 'gcupload')
      formularioDeDatos.append('cloud_name', 'grupo-cots')

      this.cloudinaryService.uploadImage(formularioDeDatos).subscribe(
        res => {
          console.log(res.secure_url);
          
          form.get('employee_photo')?.setValue(res.secure_url);
          this.updatePatient(form);
        },
        err => console.log(err)
      )
      
    } else {
      this.updatePatient(form);
    }
    
    
  }

  updatePatient(form: FormGroup){
    this.patientapiService.updatePatient(form.value).subscribe(
      res => {
        console.log(res);

      },
      err => console.log(err)
    )
  }


  requiredValidatorIsInvalid( field: string){
    if(this.form.get(field)?.errors?.required && this.form.get(field)?.touched){
      return true;
    }
    else{
      return false;
    }
  }

  emailValidatorIsInvalid( field: string){
    if(this.form.get(field)?.errors?.email && this.form.get(field)?.dirty){
      return true;
    }
    else{
      return false;
    }
  }

  capturarFile(event: any): any {
    if(event!.target!.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result
      }
      this.archivos = event.target.files;
      console.log(this.archivos);

    } 
  }


  

}
