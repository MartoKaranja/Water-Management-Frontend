import { Component, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { TasksSummaryComponent } from '../tasks-summary/tasks-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenUpdateComponent } from '../token-update/token-update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(TasksSummaryComponent) tasks_summary_component !: TasksSummaryComponent;

  constructor( private server_conn : WaterService, private dialog: MatDialog)
  {}

  public getWaterService(): WaterService {
    return this.server_conn;
  }

  refreshTasksSummary()
  {
    this.tasks_summary_component.getMeters(5,0);
    var el = document.getElementById("tasks_summary");
    if (el !== null) {
      el.scrollIntoView();
      }



  }


  openTokenUpdateDialog() {
    
    const dialogRef = this.dialog.open(TokenUpdateComponent, {
      maxWidth: '100vw',
      width: 'auto',
      height: 'auto',
      // Add any other dialog configuration options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed
      this.refreshTasksSummary()
    });
  }

  

}
