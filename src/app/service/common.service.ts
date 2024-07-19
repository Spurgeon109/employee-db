import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  headerTitle = new BehaviorSubject<string>('Employee List')
  headerTitle$ = this.headerTitle.asObservable()
  constructor() { }
}
