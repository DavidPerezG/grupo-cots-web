import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  cloudinary_URL = 'https://api.cloudinary.com/v1_1/grupo-cots/image/upload';

  constructor( 
    private http: HttpClient) { }


  uploadImage(archivos: any): Observable<any>{
    
    let data = archivos;

    return this.http.post(this.cloudinary_URL, data, {headers:{'IgnoreInterceptor':''}})

  }

  SendImageAndRecieveLink(archivos: any){
    const formularioDeDatos = new FormData();
      formularioDeDatos.append('file', archivos[0]);
      formularioDeDatos.append('upload_preset', 'gcupload')
      formularioDeDatos.append('cloud_name', 'grupo-cots')

      this.uploadImage(formularioDeDatos).subscribe(
        res => {
          //console.log(res);
          return res.secure_url;
         

        },
        err => console.log(err)
      )


  }
}