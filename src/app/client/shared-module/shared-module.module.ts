import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlPanelComponent } from 'src/app/settings-components/control-panel/control-panel.component';
import { KeyControlPanelComponent } from 'src/app/settings-components/key-control-panel/key-control-panel.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { PromptDialogComponent } from 'src/app/settings-components/control-panel/prompt-dialog/prompt-dialog.component';
import { KeyPromptDialogComponent } from 'src/app/settings-components/key-control-panel/key-prompt-dialog/key-prompt-dialog.component';



@NgModule({
  declarations: [
    ControlPanelComponent,
    KeyControlPanelComponent,
    PromptDialogComponent,
    KeyPromptDialogComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule
  ],
  exports: [
    ControlPanelComponent,
    KeyControlPanelComponent,
    PromptDialogComponent,
    KeyPromptDialogComponent
  ]
})
export class SharedModuleModule { }
