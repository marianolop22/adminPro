import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SharedService, 
         SidebarService, 
         UserService, 
         LoginGuard, 
         UploadFileService
} from "./service.index";
import { HttpClientModule } from "@angular/common/http";

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
    UploadFileService
  ]
})
export class ServiceModule { }
