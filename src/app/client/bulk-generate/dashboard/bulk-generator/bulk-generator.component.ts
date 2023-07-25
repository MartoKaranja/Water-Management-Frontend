import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleSummaryComponent } from 'src/app/client/schedule/schedule-summary/schedule-summary.component';

@Component({
  selector: 'app-bulk-generator',
  templateUrl: './bulk-generator.component.html',
  styleUrls: ['./bulk-generator.component.css']
})
export class BulkGeneratorComponent {

  @Output() getTaskHistory = new EventEmitter<void>();
  @Output() getTaskProgressEventStart = new EventEmitter<void>();
  @Output() getTaskProgressEventStop = new EventEmitter<void>();



  form: FormGroup;
  concurrent_requests : number = 60;
  progressBarMode = 'determinate';
  progress_status !: string;
  progress_message !: string;
  task_no !: number;
  intervalId !: any;
  @Input() dataService !: QuestionService;

  constructor(private fb : FormBuilder)
  {
    this.form = this.fb.group({
      num_results: [''],
      concurrent_requests: [this.concurrent_requests],
    });

  }

  public getQuestionService(): QuestionService {
    return this.dataService;
  }

  bulkGenerate()
  {
    this.progressBarMode = 'indeterminate';
    this.getTaskProgressEventStart.emit()
    // call service to bulk generate content
    console.log(this.form.value.num_results)
   if (this.form.value.num_results !== "")
   {
    //pass formdata
    let data = this.form.value;

    this.dataService.scheduleBulkContent(data).subscribe ({
      next: (results : any) => {
        console.log(results)
        this.progress_status = results.status;
        this.progress_message = results.message;
        this.task_no = results.task_no;

        this.intervalId = setInterval(() => {
          /* Backoff strategy */
          this.checkProgress();
        }, 10000);

      },
      error: (error: any) => {
        console.error(error);
      }

    });
  }
  else
  {
    this.progress_status = "Error";
    this.progress_message = "Ensure you have entered a valid number for results";
    this.progressBarMode = 'determinate';
    this.getTaskProgressEventStop.emit()

  }
}


checkProgress()
  {
    let data = {
      'task_no' : this.task_no
    }
    /* Refresh summary table bu emitting events to parent component to call child */
    this.getTaskHistory.emit();
    this.dataService.checkBulkContentProgress(data).subscribe ({
      next: (results : any) => {
        this.progress_message = results.message
        this.progress_status = results.status;
        if (results.status === "Completed")
        {
          clearInterval(this.intervalId);
          this.progressBarMode = 'determinate';
          this.getTaskProgressEventStop.emit()
        }
      }
      ,
      error: (error: any) => {
        console.error(error);
      }

    });

  }


}
