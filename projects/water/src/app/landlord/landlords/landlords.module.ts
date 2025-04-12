import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandlordsRoutes } from './landlords.routing';
import { DemoMaterialModule } from '../../demo-material-module';
import { LandlordListComponent } from './landlord-list/landlord-list.component';
import { MngLandlordClientsComponent } from './landlord-clients/landlord-clients.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LandlordListComponent,
    MngLandlordClientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LandlordsRoutes),
    DemoMaterialModule
  ]
})
export class LandlordsModule { }
