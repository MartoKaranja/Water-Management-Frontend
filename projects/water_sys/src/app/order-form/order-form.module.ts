import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { DemoMaterialModule } from '../demo-material-module';
import { OrderRoutes } from './order-form.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxSelectModule } from '@ng-matero/extensions/select';






@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OrderRoutes),
    MtxSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MtxDatetimepickerModule,
    DemoMaterialModule,
  ]
})
export class OrderModule { }
