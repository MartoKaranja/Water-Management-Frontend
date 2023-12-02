import { Component, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { TasksSummaryComponent } from '../tasks-summary/tasks-summary.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(TasksSummaryComponent) tasks_summary_component !: TasksSummaryComponent;

  constructor( private server_conn : WaterService)
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

}
