import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Tab {
  year: number
  month: number
}



@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})


export class DatePickerComponent {
  selectedDate!: Date
  tabs: Tab[] = []
  currentTab!: Tab
  monthArray: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  currentDates: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  currentTabIndex!: number
  today!: number
  todayMonth!: number
  todayYear!: number
  selectedYear!: number
  selectedMonth!: number
  selectedDay!: number
  selected!: string
  ngOnInit(): void {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    this.today = date.getDay()
    this.todayMonth = date.getMonth()
    this.todayYear = year
    this.currentTab = { year: year, month: month }
    this.tabs.push({ year: year, month: 0 })
    this.tabs.push({ year: year, month: 1 })
    this.tabs.push({ year: year, month: 2 })
    this.tabs.push({ year: year, month: 3 })
    this.tabs.push({ year: year, month: 4 })
    this.tabs.push({ year: year, month: 5 })
    this.tabs.push({ year: year, month: 6 })
    this.tabs.push({ year: year, month: 7 })
    this.tabs.push({ year: year, month: 8 })
    this.tabs.push({ year: year, month: 9 })
    this.tabs.push({ year: year, month: 10 })
    this.tabs.push({ year: year, month: 11 })
    this.currentTabIndex = month
  }

  selectDate(date: number) {
    this.selectedDate = new Date(this.currentTab.year, this.currentTab.month, date)
    this.selectedYear = this.currentTab.year
    this.selectedMonth = this.currentTab.month
    this.selectedDay = date
  }

  handlePrevClick() {
    if (this.currentTabIndex === 0) {
      const year = this.currentTab.year
      const tabObjs: Tab[] = []
      for (let i = 0; i <= 11; i++) {
        tabObjs.push({ year: year - 1, month: i })
      }
      this.tabs = [...tabObjs, ...this.tabs]
      this.currentTab = this.tabs[11]
      this.currentTabIndex = 11
    }
    else{
      this.currentTab = this.tabs[this.currentTabIndex - 1]
      this.currentTabIndex = this.currentTabIndex -1 
    } 
    
    this.getDayArray()

  }


  handleNextClick() {
    if (this.currentTabIndex === this.tabs.length - 1) {
      const year = this.currentTab.year
      const tabObjs: Tab[] = []
      for (let i = 0; i <= 11; i++) {
        tabObjs.push({ year: year + 1, month: i })
      }
      this.tabs = [...this.tabs, ...tabObjs]
      this.currentTab = this.tabs[this.currentTabIndex + 1]
      this.currentTabIndex = this.currentTabIndex + 1
    }
    else{
      this.currentTab = this.tabs[this.currentTabIndex + 1]
      this.currentTabIndex = this.currentTabIndex + 1
    }
    this.getDayArray()
  }

  getDayArray() {
    let month = this.currentTab.month, year = this.currentTab.year
    let startDate = new Date(year + "-" + (month+1) + "-01").getDay(); // Set the start date to the 1st day of the specified month
    let endDate = new Date(year, month+1, 0).getDate(); // Set the end date to the last day of the specified month
    let weekdayCount: number[] = [];
    for(let i = 0; i < startDate;i++) weekdayCount.push(0)
    for (let day = 1; day <= endDate; day++) {
      weekdayCount.push(day)
    }
    console.log(weekdayCount)
    this.currentDates = weekdayCount
  }

  onSelectChange( value: string){
    if(value === 'today'){
      this.selectDate(this.today)
    }
    if(value === 'nextMonday'){
      let endDate = new Date(this.todayYear, this.todayMonth+1, 0).getDate()
      const nextDay = this.today + ((8 -this.today) % 7);
      if(nextDay <= endDate){
        this.selectDate(nextDay)
      }
    }
    if(value === 'nextTuesday'){
      let endDate = new Date(this.todayYear, this.todayMonth+1, 0).getDate()
      const nextDay = this.today + ((9 -this.today) % 7);
      if(nextDay <= endDate){
        this.selectDate(nextDay)
      }
    }
    if(value === 'nextWeek'){
      let endDate = new Date(this.todayYear, this.todayMonth+1, 0).getDate()
      const nextDay = this.today + ((7 -this.today) % 7);
      if(nextDay <= endDate){
        this.selectDate(nextDay)
      }
    }
  }
}
