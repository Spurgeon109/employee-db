import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db'

import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component'
import { HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import * as Hammer from 'hammerjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { FormComponent } from './components/form/form.component';
import { FormLayoutComponent } from './components/form-layout/form-layout.component';

export class HammerGesture extends HammerGestureConfig{
  overrideEvent = {
    swipe: { direction: Hammer.DIRECTION_ALL }
  }
}

const dbConfig: DBConfig  = {
  name: 'employeeDB',
  version: 1,
  objectStoresMeta: [{
    store: 'employee',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'id', keypath: 'id', options: { unique: false } },
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'role', keypath: 'role', options: { unique: false } },
      { name: 'joinedDate', keypath: 'joinedDate', options: { unique: false } },
      { name: 'resignedDate', keypath: 'resignedDate', options: { unique: false } },
      { name: 'isCurrentEmployee', keypath: 'isCurrentEmployee', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DeleteAlertComponent,
    DatePickerComponent,
    FormComponent,
    FormLayoutComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    FormsModule,
    MatRippleModule,
    ReactiveFormsModule,
    HammerModule,
    MatSnackBarModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGesture
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
