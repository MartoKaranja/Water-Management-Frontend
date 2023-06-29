import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { MatProgressBar } from '@angular/material/progress-bar';


@Component({
  selector: 'app-question-db-details',
  templateUrl: './question-db-details.component.html',
  styleUrls: ['./question-db-details.component.css']
})
export class QuestionDbDetailsComponent {
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;

  id !: string;
  question_details : any;
  cleaned_text !: string;
  is_cleaned : boolean = false;
  fetched_answers : any;

  constructor(private route : ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.progressBar.mode = 'indeterminate';
    const id = this.route.snapshot.paramMap.get('id');
    const table_name = this.route.snapshot.paramMap.get('table_name');
    if (id !== null) {
      this.id = id;
      this.questionService.getQuestionDbDetails(this.id, table_name).subscribe({
        next: (data: any) => {
          this.question_details = data;
          this.progressBar.mode = 'determinate';

        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }else
    {console.log("Error...param was none")}
    }

  processText(){
    this.progressBar.mode = 'indeterminate';
    const data = {question: this.question_details.content};
    console.log(data)
    this.questionService.processQuestion(data).subscribe({
      next:(response:any) => {
        this.cleaned_text = response.response;
        console.log(this.cleaned_text);
    },
    error: (error: any) => {
      console.error(error);
      this.cleaned_text = error
    },
    complete: () => {
      this.is_cleaned = true;
      this.progressBar.mode = 'determinate';
      // This code will run regardless of whether the subscribe function succeeded or failed
    }
    });

  }

  fetchAnswers(){
    console.log("Fetching previous answers "+ this.question_details.no)
    this.questionService.fetchGeneratedAnswers(this.question_details.no).subscribe({
      next:(response:any) => {
        this.fetched_answers = response.results;
        console.log(this.cleaned_text);
    },
    error: (error: any) => {
      console.error(error);
      this.cleaned_text = error
    },
    complete: () => {
      this.progressBar.mode = 'determinate';
      // This code will run regardless of whether the subscribe function succeeded or failed
    }

  });
}

}
