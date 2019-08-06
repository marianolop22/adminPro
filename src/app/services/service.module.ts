import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SharedService, 
         SidebarService, 
         UserService, 
         LoginGuard, 
         UploadFileService,
         ModalUploadService,
         HospitalService,
         MedicService,
         CheckTokenGuard
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";
import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    MedicService,
    AdminGuard,
    CheckTokenGuard
  ]
})
export class ServiceModule { }
