import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
  ],
  providers: []
})
export class AdminModule { }
