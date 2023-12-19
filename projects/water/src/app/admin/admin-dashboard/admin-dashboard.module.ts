import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardRoutes } from './admin-dashboard.routing';
import { DemoMaterialModule } from '../../demo-material-module';
import { WaterDashboardComponent } from './water-dashboard/water-dashboard.component';
import { MeterRecordsComponent } from './water-dashboard/meter-records/meter-records.component';
import { UserRecordsComponent } from './water-dashboard/user-records/user-records.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NewUserComponent } from '../meter/new-user/new-user.component';
import { NewLandlordComponent } from '../meter/new-landlord/new-landlord.component';
import { NewMeterComponent } from '../meter/new-meter/new-meter.component';
import { ConsumptionRecordsComponent } from './consumption-records/consumption-records.component';
import { GraphsModule } from '../graphs/graphs.module';
import { PaymentModule } from '../payment/payment.module';
import { AdminWidgetsComponent } from './admin-widgets/admin-widgets.component';



@NgModule({
  declarations: [
    WaterDashboardComponent,
    MeterRecordsComponent,
    UserRecordsComponent,
    AddUserComponent,
    NewUserComponent,
    NewLandlordComponent,
    NewMeterComponent,
    ConsumptionRecordsComponent,
    AdminWidgetsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    GraphsModule,
    RouterModule.forChild(AdminDashboardRoutes),
    ReactiveFormsModule,
    PaymentModule
  ]
})
export class AdminDashboardModule { }
