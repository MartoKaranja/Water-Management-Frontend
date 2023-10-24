import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentModuleComponent } from './payment-module/payment-module.component';
import { DemoMaterialModule } from 'projects/water_sys/src/app/demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserConsumptionReportsComponent } from './user-consumption-reports/user-consumption-reports.component';



@NgModule({
  declarations: [
    PaymentModuleComponent,
    UserConsumptionReportsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  exports:
  [
    PaymentModuleComponent,
    UserConsumptionReportsComponent
  ]
})
export class SharedModule { }
