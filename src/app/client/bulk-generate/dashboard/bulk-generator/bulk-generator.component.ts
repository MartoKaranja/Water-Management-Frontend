import { Component, Input } from '@angular/core';
import { QuestionService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-bulk-generator',
  templateUrl: './bulk-generator.component.html',
  styleUrls: ['./bulk-generator.component.css']
})
export class BulkGeneratorComponent {

  progressBarMode = 'determinate'
  @Input() dataService !: QuestionService;

  public getQuestionService(): QuestionService {
    return this.dataService;
  }

}
