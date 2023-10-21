import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { Msg } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details-update',
  templateUrl: './user-details-update.component.html',
  styleUrls: ['./user-details-update.component.css']
})
export class UserDetailsUpdateComponent {
  progressBarMode= ''
  public msg !: Msg;

  constructor(private server_conn : WaterService, private snackBar: MatSnackBar)
  {

  }
  updateUserDetails()
  {
    this.progressBarMode = 'indeterminate';
    this.server_conn.updateUserDetails().subscribe({
      next: (results: Msg) => {
          console.log(results)
          this.msg = results
          this.progressBarMode = 'determinate';


          this.snackBar.open(this.msg.errMsg, 'Close', {
            duration: 10000,
          });



        },
        error: (error: any) => {
          console.error(error);
          this.progressBarMode = 'determinate';
          this.snackBar.open("An error has occured. Unable to fetch results.", 'Close', {
            duration: 10000,
          });
        }
  });
}

}
