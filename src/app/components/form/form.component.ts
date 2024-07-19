import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Subject, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interface/employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formGroup = this.fb.group({ name: '', role: '', joinedDate: '', resignedDate: '' })
  @Input() employeeData!: Employee
  roleOptions: string[] = ['Flutter Developer', 'Product Owner', 'Product Designer', 'Senior Software Developer', 'Full-Stack Developer', 'QA Tester',]
  destroy$ = new Subject()
  @Input() editMode!: boolean
  editId!: number
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public indexService: NgxIndexedDBService,
    public snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public route: Router
  ) { }
  ngOnInit(): void {
  }
  openJoinDatePicker(event: any) {
    const ref = this.dialog.open(DatePickerComponent, {
      panelClass: 'date-picker'
    })
    ref.afterClosed().pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe((data: Date) => {
      console.log(data)
      if (data) this.formGroup.controls['joinedDate'].setValue(formatDate(data, 'yyyy-MM-dd', 'en'))
    })
  }
  openResignDatePicker(event: any) {
    const ref = this.dialog.open(DatePickerComponent, {
      panelClass: 'date-picker'
    })
    ref.afterClosed().pipe(takeUntil(this.destroy$)).pipe(takeUntil(this.destroy$)).subscribe((data: Date) => {
      if (data) this.formGroup.controls['resignedDate'].setValue(formatDate(data, 'yyyy-MM-dd', 'en'))
    })
  }
  saveForm(){
    debugger
    if (this.editMode) {
      if (this.formGroup.valid) {
        const formValue = this.formGroup.value
        const currentEmployee: boolean = !(formValue?.resignedDate !== '')
        this.indexService.update('employee', {
          id: this.editId,
          ...this.formGroup.value,
          isCurrentEmployee: currentEmployee
        }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (data) => {
            this.snackBar.open('Edited the employee', 'Success', { duration: 3000 })
            this.route.navigate([''])
          },
          error: (err) => {
            this.snackBar.open('Failed to add the employee', 'Dimiss', { duration: 3000 })
            this.route.navigate([''])
          }
        }
        )
      }
    }
    else{
      if (this.formGroup.valid) {
        const formValue = this.formGroup.value
        const currentEmployee: boolean = !(formValue?.resignedDate !== '')
        this.indexService.add('employee', {
          ...formValue,
          isCurrentEmployee: currentEmployee
        }).pipe(takeUntil(this.destroy$)).subscribe({
          next: (data) => {
            this.snackBar.open('Added the employee', 'Success', { duration: 3000 })
            this.formGroup.reset()
          },
          error: (err) => {
            this.snackBar.open('Failed to add the employee', 'Dimiss', { duration: 3000 })
          }
        }
        )
      }
    }
  }

  cancelForm(){
    this.route.navigate([""])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['employeeData'].currentValue){
      const employee = changes['employeeData'].currentValue
      this.formGroup.controls.name.setValue(employee.name)
      this.formGroup.controls.role.setValue(employee.role)
      this.formGroup.controls.joinedDate.setValue(formatDate(employee.joinedDate, 'yyyy-MM-dd', 'en'))
      const res = employee.resignedDate
      if (res) {
        this.formGroup.controls.resignedDate.setValue(formatDate(res, 'yyyy-MM-dd', 'en'))
      }
      this.editId = employee.id
    }
  }
}
