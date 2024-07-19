import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component'

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'edit/:id',
    component: FormLayoutComponent
  },
  {
    path: 'create-employee',
    component: FormLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
