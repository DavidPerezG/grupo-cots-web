import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.css']
})
export class FamiliaComponent implements OnInit {

  url ="../../../assets/images/camera-png.png";
  public archivos: any;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public patientapiService: PatientsService,
    private cloudinaryService: CloudinaryService
  ) { 
    
    this.buildForm();
    this.form.valueChanges.subscribe(
      value => { console.log(value); }
    )
  }

  ngOnInit(): void {
    
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      curp : ['', []],
      rfc : ['', []],
      employee_photo : ['', []],
      first_name : ['', [Validators.required]],
      middle_name : ['', []],
      paternal_surname : ['', []],
      maternal_surname : ['', [Validators.required]],
      marital_status : ['', []],
      gender : ['', [Validators.required]],
      date_birth : ['', [Validators.required]],
      age : ['', [Validators.required]],
      place_birth : ['', []],
      eye_color : ['', []],
      hair_color : ['', []],
      weight : ['', [Validators.required]],
      nationality : ['', []],
      height : ['', [Validators.required]],
      religion : ['', []],
      name_emergency : ['', [Validators.required]],
      telephone_emergency : ['', [Validators.required]],
      cellphone_emergency : ['', [Validators.required]],
      address : ['', []],
      email : ['', [Validators.required, Validators.email]],
      donor : ['', []],
      name_father : ['', [Validators.required]],
      name_mother : ['', [Validators.required]],
      password : ['', [Validators.required]],
    }, { updateOn: 'submit' });
  }

  saveForm(event: Event){
    event.preventDefault();
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.addPatient(this.form)
    }
  }

  addPatient(form: FormGroup){
    if (this.archivos !== undefined){
      const formularioDeDatos = new FormData();
      formularioDeDatos.append('file', this.archivos[0]);
      formularioDeDatos.append('upload_preset', 'gcupload')
      formularioDeDatos.append('cloud_name', 'grupo-cots')

      this.cloudinaryService.uploadImage(formularioDeDatos).subscribe(
        res => {
          console.log(res.secure_url);
          
          form.get('employee_photo')?.setValue(res.secure_url);
          this.createPatient(form);
        },
        err => console.log(err)
      )
      
    } else {
      this.createPatient(form);
    }
    
    
  }

  createPatient(form: FormGroup){
    this.patientapiService.createPatient(form.value).subscribe(
      res => {
        console.log(res);
        form.reset();
      },
      err => console.log(err)
    )
    this.url ="../../../assets/images/camera-png.png";
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
