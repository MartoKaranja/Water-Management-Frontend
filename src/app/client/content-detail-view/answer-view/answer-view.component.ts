import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-answer-view',
  templateUrl: './answer-view.component.html',
  styleUrls: ['./answer-view.component.css']
})
export class AnswerViewComponent {

  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;

  id !: string;
  answer_details : any;
  cleaned_text !: string;
  is_cleaned : boolean = false;
  fetched_answers : any;
  renderHtml = true;

  constructor(private route : ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void
  {
    this.progressBar.mode = 'indeterminate';
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = id;
      this.questionService.getGeneratedSingleAnswer(this.id,).subscribe({
        next: (data: any) => {
          this.answer_details = data;
          this.progressBar.mode = 'determinate';

        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }else
    {console.log("Error...param was none")}
  }

  toggle() {
    this.renderHtml = !this.renderHtml;
  }

}
