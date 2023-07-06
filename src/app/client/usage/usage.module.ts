import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage/usage.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { UsageRoutes } from './usage.routing';



@NgModule({
  declarations: [
    UsageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsageRoutes),
    DemoMaterialModule

  ]
})
export class UsageModule { }
