import { Component, ViewEncapsulation, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserSummaryList, Users } from '../../../interfaces/questions.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';


@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GenerateInvoiceComponent implements OnInit, AfterViewInit, OnDestroy  {
  invoiceForm !: FormGroup;
  userList !: Users[];
  selected_users !: Users[];
  userFilterCtrl: FormControl = new FormControl('');

  public tooltipMessage = 'Select All / Unselect All';

  /** list of users filtered by search keyword */
  public filteredUsers: ReplaySubject<Users[]> = new ReplaySubject<Users[]>(1);

  /** local copy of filtered users to help set the toggle all checkbox state */
  protected filteredUsersCache: Users[] = [];

  /** flags to set the toggle all checkbox state */
  isIndeterminate = false;
  isChecked = false;

  @ViewChild('multiSelect', { static: true }) multiSelect !: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<GenerateInvoiceComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userList = data.users.users;
  }

  ngOnInit() {
    this.initForm();

    // load the initial user list
    this.filteredUsers.next(this.userList.slice());

    // listen for search field value changes
    this.userFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsers();
      });

    // listen for selection changes
    this.invoiceForm.get('selectedUser')?.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(selectedValues => {
        this.logSelectionChanges(selectedValues);
        this.updateToggleAllState();
      });
  }

  protected filterUsers() {
    if (!this.userList) {
      return;
    }
    
    // get the search keyword
    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsersCache = this.userList.slice();
      this.filteredUsers.next(this.filteredUsersCache);
      return;
    } else {
      search = search.toLowerCase();
    }
    
    // filter the users
    this.filteredUsersCache = this.userList.filter(user => 
      user.user_name.toLowerCase().indexOf(search) > -1
    );
    this.filteredUsers.next(this.filteredUsersCache);
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  initForm() {
    this.invoiceForm = this.formBuilder.group({
      selectedUser: [[]]
    });
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredUsers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        const selectedValues = selectAllValue ? val.map(user => user.user_no) : [];
        this.invoiceForm.get('selectedUser')?.patchValue(selectedValues);
        this.logSelectionChanges(selectedValues);
      });
  }

  /**
   * Logs the current selection state of form controls
   */
  protected logSelectionChanges(selectedValues: any[]) {
    console.log('Selected Users:', selectedValues);
    if (selectedValues && selectedValues.length > 0) {
      const selectedUsers = this.userList.filter(user => 
        selectedValues.includes(user.user_no)
      );
      console.log('Selected User Details:', selectedUsers);
    }
  }

  /**
   * Updates the state of the toggle all checkbox based on current selection
   */
  protected updateToggleAllState() {
    const selectedValues = this.invoiceForm.get('selectedUser')?.value || [];
    const totalFilteredItems = this.filteredUsersCache.length;
    
    this.isChecked = selectedValues.length === totalFilteredItems;
    this.isIndeterminate = selectedValues.length > 0 && selectedValues.length < totalFilteredItems;
  }

  /**
   * Sets the initial value after the filteredUsers are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsers
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.multiSelect.compareWith = (a: Users, b: Users) => a && b && a.user_no === b.user_no;
      });
  }
}
