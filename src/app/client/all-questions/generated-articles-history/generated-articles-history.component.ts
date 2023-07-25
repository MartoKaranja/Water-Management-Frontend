import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { GeneratedArticle, Answer, Article } from 'src/app/interfaces/questions.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigService } from 'src/app/services/configService';

@Component({
  selector: 'app-generated-articles-history',
  templateUrl: './generated-articles-history.component.html',
  styleUrls: ['./generated-articles-history.component.css']
})
export class GeneratedArticlesHistoryComponent {
  idList!: any;
  totalItems = 0;
  answer_titles: Article | undefined;
  table_source !: MatTableDataSource<GeneratedArticle>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;
  @ViewChild(MatProgressSpinnerModule, {static: true}) progressBarSpinner!: MatProgressSpinnerModule;

  columnsToDisplay = ['generated_text','date_processed', 'total_tokens', 'status', 'view', 'select'];


  task_id !:any;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private configService : ConfigService)
  {
    this.table_source = new MatTableDataSource<GeneratedArticle>();
  }

  ngOnInit() {
    this.task_id= this.route.snapshot.paramMap.get("id");
    this.progressBar.mode = 'indeterminate'
    this.fetchData()

  }


  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.progressBar.mode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex).toString())
      this.fetchData(this.paginator.pageSize, (this.paginator.pageIndex).toString());
    });
  }

  fetchData(pageSize?: number, pageNumber?: string) {
    this.questionService.getTaskGeneratedArticles(this.task_id, pageSize, pageNumber).subscribe({
      next: (answer_titles: Article) => {
        this.answer_titles = answer_titles;
        console.log('Value of question titles:', this.answer_titles);
        this.totalItems = this.answer_titles.count;
        this.table_source.data = this.answer_titles.results;

        this.paginator.length = this.totalItems;
        //this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize
        this.progressBar.mode = 'determinate';
        //this.table_source.paginator = this.paginator;

        //console.log('Paginator:', this.table_source.paginator);
        console.log('Value of this.table_source:', this.table_source.data);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  downloadFile(task_no: number) {
    this.progressBar.mode = 'indeterminate';

    const url = this.configService.getApiUrl() + `questions/export/${task_no}/`;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `task_${task_no}.csv`;

    // Listen for the load event on the link element
    link.addEventListener('load', () => {
      this.progressBar.mode = 'determinate';
    });

    // Append the link to the document and click it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.progressBar.mode = 'determinate';
  }

}
