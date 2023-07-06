import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { MatProgressBar } from '@angular/material/progress-bar';


@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;

  id !: string;
  question_details : any;
  cleaned_text !: string;
  is_cleaned : boolean = false;
  renderHtml = true;

  constructor(private route : ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.questionService.getQuestionDetails(this.id).subscribe({
        next: (data: any) => {
          this.question_details = data;

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
        this.cleaned_text = response.cleaned_text;
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

  toggle() {
    this.renderHtml = !this.renderHtml;
  }

}
