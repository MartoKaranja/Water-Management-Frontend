import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { GeneratedAnswer, Answer } from 'src/app/interfaces/questions.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigService } from 'src/app/services/configService';

@Component({
  selector: 'app-generated-answers-history',
  templateUrl: './generated-answers-history.component.html',
  styleUrls: ['./generated-answers-history.component.css']
})
export class GeneratedAnswersHistoryComponent {

  idList!: any;
  totalItems = 0;
  answer_titles: Answer | undefined;
  table_source !: MatTableDataSource<GeneratedAnswer>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;
  @ViewChild(MatProgressSpinnerModule, {static: true}) progressBarSpinner!: MatProgressSpinnerModule;

  columnsToDisplay = ['title', 'category', 'question', 'generated_text', 'status', 'view', 'select'];


  task !:any;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private configService : ConfigService)
  {
    this.table_source = new MatTableDataSource<GeneratedAnswer>();
  }

  ngOnInit() {
    this.task= this.route.snapshot.paramMap.get("id");
    this.progressBar.mode = 'indeterminate'
    if (isNaN(Number(this.task)))
    {
      this.fetchData()
      console.log("Fetching timestamp answers")
    }
    else
    {
      this.fetchTask()
      console.log("Fetching tasks")
    }

  }


  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.progressBar.mode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex).toString());
      if (isNaN(Number(this.task)))
      {

        this.fetchData(this.paginator.pageSize, (this.paginator.pageIndex).toString())
        console.log("Fetching timestamp answers")
      }
      else
      {
        this.fetchTask(this.paginator.pageSize, (this.paginator.pageIndex).toString())
        console.log("Fetching tasks via task no")
      }

    });
  }

  fetchData(pageSize?: number, pageNumber?: string) {
    this.questionService.getGeneratedTimestampAnswers(this.task, pageSize, pageNumber).subscribe({
      next: (answer_titles: Answer) => {
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

  export() {


  }

  fetchTask(pageSize?: number, pageNumber?: string)
  {
    this.questionService.getTaskGeneratedAnswers(this.task, pageSize, pageNumber).subscribe({
      next: (answer_titles: Answer) => {
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

  ngOnDestroy(): void {
    //this.data.deleteData()
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
