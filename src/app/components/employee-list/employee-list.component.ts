import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/interface/employee';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';
import { FormBuilder } from '@angular/forms';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Subject, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common'
import { NgxIndexedDBService } from 'ngx-indexed-db'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  destroy$ = new Subject()
  employeeList: Employee[] = [
    {
      id: 1,
      name: 'Samantha Lee',
      role: 'Full-Stack Developer',
      joinedDate: new Date(2022, 9, 21),
      resignedDate: null,
      isCurrentEmployee: true
    },
    {
      id: 2,
      name: 'David Kim',
      role: 'Senior Software Developer',
      joinedDate: new Date(2022, 7, 1),
      resignedDate: null,
      isCurrentEmployee: true
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'Senior Software Developer',
      joinedDate: new Date(2022, 6, 14),
      resignedDate: null,
      isCurrentEmployee: true
    },
    {
      id: 4,
      name: 'Emily Davis',
      role: 'Full-Stack Developer',
      joinedDate: new Date(2022, 9, 21),
      resignedDate: new Date(2023, 1, 1),
      isCurrentEmployee: false
    },
    {
      id: 5,
      name: 'Json Patel',
      role: 'Senior Software developer',
      joinedDate: new Date(2022, 7, 1),
      resignedDate: new Date(2023, 12, 31),
      isCurrentEmployee: false
    },
    {
      id: 6,
      name: 'Rachel Nyugen',
      role: 'Senior Software Developer',
      joinedDate: new Date(2022, 7, 27),
      resignedDate: null,
      isCurrentEmployee: false
    },
  ]
  currentEmployeeList: Employee[] = [];
  previousEmployeeList: Employee[] = [];
  editMode: boolean = false
  createMode: boolean = false
  currentEditId!: number
  formGroup = this.fb.group({ name: '', role: '', joinedDate: '', resignedDate: '' })
  roleOptions: string[] = ['Flutter Developer', 'Product Owner', 'Product Designer', 'Senior Software Developer', 'Full-Stack Developer', 'QA Tester',]
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public indexService: NgxIndexedDBService,
    public snackBar: MatSnackBar,
    public route: Router
  ) { }
  ngOnInit(): void {
    this.getTheEmployeeList()
  }

  getTheEmployeeList(){
    this.indexService.getAll('employee').pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (data && data.length === 0) {
        this.indexService.bulkAdd('employee', this.employeeList)
      }
      this.employeeList = data
      this.currentEmployeeList = this.employeeList.filter(i => i.isCurrentEmployee)
      this.previousEmployeeList = this.employeeList.filter(i => !i.isCurrentEmployee)
    })
  }
  editEmployee(id: number) {
    this.route.navigate([`edit/${id}`])
    // this.editMode = true
    // this.formGroup.controls.name.setValue(employee.name)
    // this.formGroup.controls.role.setValue(employee.role)
    // this.formGroup.controls.joinedDate.setValue(formatDate(employee.joinedDate, 'yyyy-MM-dd', 'en'))
    // const res = employee.resignedDate
    // if (res) {
    //   this.formGroup.controls.resignedDate.setValue(formatDate(res, 'yyyy-MM-dd', 'en'))
    // }
    // this.currentEditId = employee.id
  }

  createEmployeePreOp() {
    this.route.navigate(['create-employee'])
  }

  deleteEmp(id: number) {
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      disableClose: true
    })
    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data === "success") {
          this.deleteEmployee(id)
        }
      }
    })
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

  touchStart(event:any){
    console.log(event)
  }
  
  deleteEmployee(id: number){
    this.indexService.delete('employee', id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data)=>{
        this.snackBar.open('Employee data has been deleted', "Success", { duration: 3000 })
        this.getTheEmployeeList()
      },
      error: (err)=>{
        this.snackBar.open('Failed to delete the employee', "Dismiss", { duration: 3000 })
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.unsubscribe()
  }
}
