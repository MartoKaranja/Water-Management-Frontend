import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { BulkGenerateRoutes } from './bulk-generate.routing';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { BulkGeneratorComponent } from './dashboard/bulk-generator/bulk-generator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    BulkGeneratorComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    SharedModuleModule,
    RouterModule.forChild(BulkGenerateRoutes),
    ReactiveFormsModule,
  ]
})
export class BulkGenerateModule { }
