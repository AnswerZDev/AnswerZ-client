import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NB_BUILT_IN_JS_THEMES, NB_BUTTON_GROUP, NbButtonModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { SidebarToggleComponent } from './component/sidebar-toggle-component/sidebar-toggle-component.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardAdminComponent,
    SidebarToggleComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbSidebarModule,
    NbLayoutModule,
    NbButtonModule,
    RouterModule,
    NbThemeModule,
  ],
  providers: [
    NbSidebarService,
    NbThemeService,
  ]
})
export class AdminModule { }
