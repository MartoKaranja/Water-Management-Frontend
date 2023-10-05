import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumptionGraphsComponent } from './consumption-graphs/consumption-graphs.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { UserConsumptionGraphsComponent } from './user-consumption-graphs/user-consumption-graphs.component';



@NgModule({
  declarations: [
    ConsumptionGraphsComponent,
    UserConsumptionGraphsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports:[
    ConsumptionGraphsComponent,
    UserConsumptionGraphsComponent,
  ]
})
export class GraphsModule { }
