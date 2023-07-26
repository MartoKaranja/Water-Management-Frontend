import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent {
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;

  id !: string;
  article_details : any;
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
      this.questionService.getGeneratedSingleArticle(this.id,).subscribe({
        next: (data: any) => {
          this.article_details = data;
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
