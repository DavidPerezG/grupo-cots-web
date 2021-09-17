import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

//Components
import { LoginComponent } from './components/login/login.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalPerfilComponent } from './components/modal-perfil/modal-perfil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    component: ModalFormComponent
  },
  {
    path: 'modal-perfil',
    component: ModalPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
