import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandlordDashboardRoutes } from './landlord-dashboard-routing';
import { WidgetsComponent } from './widgets/widgets.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { ConsumptionRecordsModule } from '../consumption-records/consumption-records.module';
import { GraphsModule } from '../../admin/graphs/graphs.module';
import { LandlordClientsComponent } from './landlord-clients/landlord-clients.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WidgetsComponent,
    LandlordClientsComponent,
    PaymentSummaryComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(LandlordDashboardRoutes),
    ConsumptionRecordsModule,
    GraphsModule
  ]
})
export class LandlordDashboardModule { }
