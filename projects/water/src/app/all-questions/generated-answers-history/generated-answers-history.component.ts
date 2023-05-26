import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/questions.service';
import { GeneratedAnswer, Answer } from 'src/app/interfaces/questions.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  columnsToDisplay = ['title', 'category', 'question', 'generated_text', 'select'];


  timestamp !:any;

  constructor(private route: ActivatedRoute, private questionService: QuestionService)
  {
    this.table_source = new MatTableDataSource<GeneratedAnswer>();
  }

  ngOnInit() {
    this.timestamp= this.route.snapshot.paramMap.get("id");
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
    this.questionService.getGeneratedTimestampAnswers(this.timestamp, pageSize, pageNumber).subscribe({
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

  ngOnDestroy(): void {
    //this.data.deleteData()
  }


}
