import { Component, ViewChild, } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-sidebar-patients',
  templateUrl: './sidebar-patients.component.html',
  styleUrls: ['./sidebar-patients.component.css']
})
export class SidebarPatientsComponent {

  title = 'servicio-medico';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    public router: Router,
    public authService: AuthService,
    ) {
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res =>{
      if(res.matches) {
        this.sidenav.mode ='over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    }))
  }



  public closeSidenavIf() {
    if(window.innerWidth <= 800){
      console.log(window.innerWidth)
      this.sidenav.close();
    } 
  }

  

}
