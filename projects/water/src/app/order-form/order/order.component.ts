import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
/*
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
*/
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { MtxDatetimepickerFilterType } from '@ng-matero/extensions/datetimepicker';
import { MtxDatetimepicker } from '@ng-matero/extensions/datetimepicker';

import * as moment from 'moment';


@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  type = 'moment';

  //group!: FormGroup;
  today!: moment.Moment;
  tomorrow!: moment.Moment;
  min!: moment.Moment;
  max!: moment.Moment;
  start!: moment.Moment;
  filter!: (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => boolean;

  title = 'Place your Order Now';
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  length_types = [
    { id: 1, name: 'Words' },
    { id: 2, name: 'Pages'},
  ];
  default_type = 'Pages'
  default_person !: string
  default_english !: string



  constructor(private dateAdapter: DateAdapter<any>, private _formBuilder: FormBuilder) {
    this.today = moment.utc();
    this.tomorrow = moment.utc().date(moment.utc().date() + 1);
    this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
    this.max = this.min.clone().date(4).minute(45);
    this.start = this.today.clone().year(1930).month(9).date(28);
    this.filter = (date: moment.Moment | null, type: MtxDatetimepickerFilterType) => {
      if (date === null) {
        return true;
      }
      switch (type) {
        case MtxDatetimepickerFilterType.DATE:
          return date.year() % 2 === 0 && date.month() % 2 === 0 && date.date() % 2 === 0;
        case MtxDatetimepickerFilterType.HOUR:
          return date.hour() % 2 === 0;
        case MtxDatetimepickerFilterType.MINUTE:
          return date.minute() % 2 === 0;
      }
    };
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      paper_length: [''],
      length_type: new FormControl(),
      topic: [''],
      deadline: [''],
      description: [''],
  });
  this.secondFormGroup = this._formBuilder.group({
    username: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    city: [''],
    address: [''],
    company: [''],
    tele: [''],
    website: [''],
    date: [''],
    audience: [''],
    written_in: [''],
    business_description: ['']

  });
  //this.default_person = '1'
  //this.default_english = 'US English'
  }
  submit(){
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }

}
