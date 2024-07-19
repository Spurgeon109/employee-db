import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from './service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-app';
  headerTitle: string = "Employee List"
  constructor(
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public commonService: CommonService
  ){}
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.registerIcons()
  }
  registerIcons(){
    this.matIconRegistry.addSvgIcon('edit', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg'))
    this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg'))
    this.matIconRegistry.addSvgIcon('add', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'))
    this.matIconRegistry.addSvgIcon('delete-outline', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete-outline.svg'))
    this.matIconRegistry.addSvgIcon('arrow-right', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-right.svg'))
    this.matIconRegistry.addSvgIcon('calendar', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/calendar.svg'))
    this.matIconRegistry.addSvgIcon('person', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/person.svg'))
    this.matIconRegistry.addSvgIcon('work', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/work.svg'))
    this.matIconRegistry.addSvgIcon('no-record', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/no-record.svg'))
    this.matIconRegistry.addSvgIcon('arrow-right-fill', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-right-fill.svg'))
    this.matIconRegistry.addSvgIcon('arrow-left-fill', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-left-fill.svg'))
  }
}
