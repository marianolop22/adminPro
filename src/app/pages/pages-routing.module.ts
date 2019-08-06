 import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AdminGuard, CheckTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'dashboard', 
    component: DashboardComponent, 
    canActivate: [CheckTokenGuard],
    data: { titulo: 'Dashboard'}
  },
  {path:'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
  {path:'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
  {path:'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
  {path:'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs'} },
  {path:'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion'} },
  {path:'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'} },
  {path:'busqueda/:term', component: SearchComponent, data: { titulo: 'Buscador'} },
    //mantenimientos
  {
    path:'usuarios', 
    component: UsersComponent, 
    data: { titulo: 'Mantenimiento de Usuarios'},
    canActivate: [AdminGuard]
  },

  {path:'hospitales', component: HospitalsComponent, data: { titulo: 'Mantenimiento de Hospitales'} },
  {path:'medicos', component: MedicsComponent, data: { titulo: 'Mantenimiento de Médicos'} },
  {path:'medico/:id', component: MedicComponent, data: { titulo: 'Actualizar Médico'} },
  {path:'', redirectTo: '/dashboard', pathMatch:'full' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
