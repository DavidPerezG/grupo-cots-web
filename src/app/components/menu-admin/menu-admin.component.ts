
import { UsersApiService } from 'src/app/services/users-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  termino: any;
  constructor(public usersapiService: UsersApiService, public authService: AuthService) { }
  p: number = 1;
  users:any;

  getUsers(){
    this.usersapiService.getUsers()
    .subscribe(
      (res: any) => {

        if(res.docs){
          this.users = res.docs;
          this.usersapiService.users = res.docs
        }
        else{
          this.users = res;
          this.usersapiService.users = res;
        }
        console.log(this.usersapiService.users)
      },
      err => console.log(err)
    )
  }

  deleteAdmin(id: string){
    const res = confirm("¿Eliminar Administrador?")
    
    if(res){
      this.usersapiService.deleteAdmin(id).subscribe(
        res => {
          console.log(res);
          this.getUsers();
        },
        err => console.log(err)
      )
    }
  }

  ngOnInit(): void {
    this.getUsers()
  }

  

}
