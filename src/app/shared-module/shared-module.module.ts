import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from '../control-panel/control-panel.component';



@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlPanelComponent
  ]
})
export class SharedModuleModule { }
