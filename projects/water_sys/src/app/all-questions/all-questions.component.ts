import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { QuestionService } from '../services/questions.service';
import { Question, Title, Titledetail } from '../interfaces/questions.interface';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, NavigationExtras } from '@angular/router';
import { DataStorage } from '../services/data-store';



@Component({
  selector: 'app-questions-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})


export class AllQuestionsComponent implements OnInit, AfterViewInit {
  allSelected = false;
  intervalId !: any;
  saved_ids !: any[];
  process_status !: any;
  question_titles: Title | undefined;
  @ViewChild(MatProgressBar, {static: true}) progressBar!: MatProgressBar;
  @ViewChild(MatProgressSpinnerModule, {static: true}) progressBarSpinner!: MatProgressSpinnerModule;
  table_source: MatTableDataSource<Titledetail>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalItems = 0;
  selected_ids !: any [];
  status_response !: string;
  show_complete_button: boolean = false;

  columnsToDisplay = ['title', 'category', 'generate', 'select'];

  constructor(private questionService: QuestionService, private router: Router, private data: DataStorage) {
    this.table_source = new MatTableDataSource<Titledetail>();
  }

  ngOnInit() {
    this.progressBar.mode = 'indeterminate';
    this.fetchData();
  }

  ngAfterViewInit() {
    //this.table_source.paginator = this.paginator;
    this.table_source.sort = this.sort;
    this.table_source.paginator = this.paginator;
    this.table_source.paginator.page.subscribe(() => {
      this.progressBar.mode = 'indeterminate';
      console.log(this.paginator.pageSize, (this.paginator.pageIndex).toString())
      this.fetchData(this.paginator.pageSize, (this.paginator.pageIndex).toString());
    });
  }

  fetchData(pageSize?: number, pageNumber?: string) {
    this.questionService.getQuestionTitles(pageSize, pageNumber).subscribe({
      next: (question_titles: Title) => {
        this.question_titles = question_titles;
        console.log('Value of question titles:', this.question_titles);
        this.totalItems = this.question_titles.count;
        this.table_source.data = this.question_titles.results;

        this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.paginator.pageIndex; // reset the paginator's pageIndex to zero
        this.paginator.pageSize = pageSize || this.paginator.pageSize; // update the paginator's pageSize
        this.progressBar.mode = 'determinate';
        //this.table_source.paginator = this.paginator;

        console.log('Paginator:', this.table_source.paginator);
        console.log('Value of this.table_source:', this.table_source.data);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  generateAnswers():void{
    this.progressBar.mode = 'indeterminate';
    this.selected_ids = []
    this.selected_ids = this.getSelectedItems().map(item => item.no);
    console.log(this.selected_ids)
    this.selected_ids = this.getSelectedItems().map(item => item.no);
    if (this.selected_ids.length === 0) {
      this.status_response = "Please choose atleast one question"
      this.progressBar.mode = 'determinate';
      return }
    this.questionService.processQuestions(this.selected_ids).subscribe({
      next:(response:any) => {
        this.status_response = response.status;

        this.saved_ids = response.saved_ids
        console.log(this.status_response, this.saved_ids);
    },
    error: (error: any) => {
      console.error(error);
      this.status_response = error
    },
    complete: () => {

      // start checking for results
      this.startPolling(this.saved_ids);
      // This code will run regardless of whether the subscribe function succeeded or failed
    }
    });
  }

  startPolling(saved_ids : any []): void {
    // Start polling the Django view every 5 seconds
    this.intervalId = setInterval(() => {
      this.questionService.checkProgress(saved_ids).subscribe({
        next:(response:any) => {
          console.log(response)
          this.process_status = response.status
          this.status_response = response.msg;
          console.log(this.status_response);
      },
      error: (error: any) => {
        console.error(error);
        this.status_response = error
      },
      complete: () => {


        if (this.process_status == 'Complete'){
          this.progressBar.mode = 'determinate';
          this.show_complete_button = true
          this.stopPolling()
        }

        // This code will run regardless of whether the subscribe function succeeded or failed
      }
      });
    }, 5000);

  }

  stopPolling(): void {
    // Stop polling the Django view
    clearInterval(this.intervalId);
  }

  toggleSelectAll(): void {
    this.allSelected = !this.allSelected;
    this.table_source.data.forEach(item => item.selected = this.allSelected);
    //this.table.renderRows();
    console.log('Value of this.table_source:', this.table_source.data);
  }

  toggleSelection(item: Titledetail): void {
    item.selected = !item.selected;
    this.table_source.data = this.table_source.data.slice();
    console.log('Value of this.table_source:', this.table_source.data);
  }

  getSelectedItems(): Titledetail[] {
    console.log('Value of this.table_source:', this.table_source.data.filter(item => item.selected));
    return this.table_source.data.filter(item => item.selected);
  }

  public getQuestionService(): QuestionService {
    return this.questionService;
  }

  viewResults():void
  {
    this.data.setData(this.saved_ids)
    this.router.navigate(['/questions/generated-answers']);
  }

}
