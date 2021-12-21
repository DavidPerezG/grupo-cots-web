import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private URL = 'http://localhost:3000/api/users';

  constructor( private http: HttpClient ) {}

  getMyUser(){
    var myId = localStorage.getItem('id-user');
    return this.http.get<any>(this.URL + '/' + myId);
  }

  createPatient(patient: Patient){
    patient.roles = 'patient';
    return this.http.post(this.URL + '/patients', patient)
  }

  updatePatient(patient: Patient){
    patient.roles = 'patient';
    var myId = localStorage.getItem('id-user');
    return this.http.put(this.URL + '/' + myId , patient);

  }


}
