import { Component, ViewChild } from '@angular/core';

import { QuestionService } from 'src/app/services/questions.service';
import { ScheduleSummaryComponent } from '../schedule-summary/schedule-summary.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-questions',
  templateUrl: './schedule-questions.component.html',
  styleUrls: ['./schedule-questions.component.css']
})
export class ScheduleQuestionsComponent {

  @ViewChild(ScheduleSummaryComponent) scheduleSummary !: ScheduleSummaryComponent;


  selectedOption !: string;
  showCategory : boolean = false;
  selectedCategory !: string;
  options :any = [];
  database_tables:any = [];
  database_questions!: number;
  offset_number : number = 0;
  question_max : number = 100;
  offset_width : number = 25;
  public concurrent_requests : string = "60";
  progress_width : number = 25;
  progress_status !: string;
  progress_message !: string;
  task_no !: number;
  content_length : number = 80;
  intervalId !: any;

  form = new FormGroup({
    offset_number: new FormControl(this.offset_number),
    concurrent_requests: new FormControl(this.concurrent_requests),
    database_questions: new FormControl(this.database_questions),
  });


  constructor(private dataService: QuestionService) {}

  ngOnInit() {

    this.dataService.getDatabaseSummary().subscribe({
      next: (database_results: any) => {
        this.database_tables = database_results.tables

      },
      error: (error: any) => {
        console.error(error);
      }
    });


  }
  //---------------------------------------------------

  fetchCategories(){

    let data = {
      'table_name':this.selectedOption,
      'content_length' : this.content_length
      }

    this.dataService.getCategories(data).subscribe((data) => {
      for (let i = 0; i < this.database_tables.length; i++) {
        if (this.database_tables[i][0] === this.selectedOption){
          this.question_max = this.database_tables[i][1]
        }
      }

      this.options = data;
      this.showCategory = true
    });

  }

  onInputChange(){

    this.offset_number = this.form.value.offset_number ?? 0;
    this.database_questions = this.form.value.database_questions ?? 0;

    if (this.form.value.offset_number === undefined)
    {
      this.offset_number = 0
      this.offset_width = 0

    }
    else{
      this.offset_width = (this.offset_number / this.question_max)* 100;
    }
    if (this.database_questions === undefined)
    {
      this.database_questions = 0
      this.progress_width = 0
    }
    else{
      if (this.database_questions > (this.question_max - this.offset_number))
      {
        this.database_questions = this.question_max - this.offset_number;

      }
      if (this.offset_number === undefined)
      {
        this.progress_width = (this.database_questions / this.question_max) * 100;
      }
      else{
        this.progress_width = this.database_questions / this.question_max * 100;
      }


    }

    this.form.controls['database_questions'].setValue(this.database_questions);

  }

  processQuestions()
  {
    this.scheduleSummary.progressBarMode = 'indeterminate';

    console.log(this.selectedOption)
    if (this.form.value.database_questions != 0)
    {
      let data = {
        'table_name': this.selectedOption,
        'questions': this.form.value.database_questions,
        'offset': this.form.value.offset_number,
        'threads' : this.form.value.concurrent_requests,
        'category' : this.selectedCategory,
        'content_length' : this.content_length
      }

      this.dataService.scheduleBulkQuestions(data).subscribe ({
        next: (results : any) => {
          console.log(results)
          this.progress_status = results.status;
          this.progress_message = results.message;
          this.task_no = results.task_no

          this.intervalId = setInterval(() => {
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
      this.progress_message = "Ensure you have entered a valid number of questions";
      this.scheduleSummary.progressBarMode = 'determinate';

    }




  }

  checkProgress()
  {
    let data = {
      'task_no' : this.task_no
    }
    this.scheduleSummary.getTasksHistory();
    this.dataService.checkBulkScheduleProgress(data).subscribe ({
      next: (results : any) => {
        this.progress_message = results.message
        this.progress_status = results.status;
        if (results.status === "Completed")
        {
          clearInterval(this.intervalId);

          this.scheduleSummary.progressBarMode = 'determinate';
        }


      }
      ,
      error: (error: any) => {
        console.error(error);
      }

    });

  }

  public getQuestionService(): QuestionService {
    return this.dataService;
  }


}
