import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/interface/employee';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent {
  title: string = ''
  empData!: Employee
  destroy$ = new Subject()
  editMode: boolean = false
  constructor(
    public route: Router,
    public activateRoute: ActivatedRoute,
    public indexService: NgxIndexedDBService,
    public snackBar: MatSnackBar
  ){
  }
  
  ngOnInit(): void {
    if(this.route.url.includes("create-employee")) this.title = 'Create Employee'
    else if(this.route.url.includes("edit")){
      this.title = 'Edit the Employee'
      const id = this.activateRoute.snapshot.paramMap.get('id') as string
      this.indexService.getByID('employee', parseInt(id)).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data: any)=>{
          if(!data) {
            this.snackBar.open('Error in editing the data. Please refresh and try again', "Dismiss", {duration: 3000})
            this.route.navigate([""])
          }
          else{
            this.editMode = true
            this.empData = data
          }
      },
      error: (err)=>{
          this.snackBar.open('Error in editing the data. Please refresh and try again', "Dismiss", {duration: 3000})
          this.route.navigate([""])
        }
      })
    }
  }

  deleteEmployee(){
    this.indexService.delete('employee', this.empData.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data)=>{
        this.snackBar.open('Employee data has been deleted', "Success", { duration: 3000 })
        this.route.navigate([''])
      },
      error: (err)=>{
        this.snackBar.open('Failed to delete the employee', "Dismiss", { duration: 3000 })
        this.route.navigate([''])
      }
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.unsubscribe()
  }

}
