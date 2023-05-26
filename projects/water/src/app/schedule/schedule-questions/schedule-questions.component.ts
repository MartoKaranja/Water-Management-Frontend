import { Component } from '@angular/core';

import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-schedule-questions',
  templateUrl: './schedule-questions.component.html',
  styleUrls: ['./schedule-questions.component.css']
})
export class ScheduleQuestionsComponent {
  selectedOption !: string;
  showCategory : boolean = false
  selectedCategory !: string;
  options :any = [];
  database_tables:any = [];
  database_questions!: number;
  offset_number !: number;
  question_max : number = 100
  offset_width : number = 25
  progress_width : number = 25
  progress_status !: string;


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

    this.dataService.getCategories(this.selectedOption).subscribe((data) => {
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

    if (this.offset_number === undefined)
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

    /*console.log("start from " + this.offset_number)
    console.log("No of questions " + this.database_questions)
    console.log("Total db size " + this.question_max)
    console.log("Progress width " + this.progress_width)
    console.log("Offset width " + this.offset_width)*/



  }

  processQuestions()
  {
    console.log(this.selectedOption)

    let data = {
      'table_name': this.selectedOption,
      'questions': this.database_questions,
      'offset': this.offset_number,
      'category' : this.selectedCategory
    }

    this.dataService.scheduleBulkQuestions(data).subscribe((results) => {
      this.progress_status = results.status;
    });


  }

  public getQuestionService(): QuestionService {
    return this.dataService;
  }


}
