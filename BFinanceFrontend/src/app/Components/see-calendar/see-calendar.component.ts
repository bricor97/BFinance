import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-see-calendar',
  templateUrl: './see-calendar.component.html',
  styleUrls: ['./see-calendar.component.css']
})
export class SeeCalendarComponent implements OnInit {

  todayDate = new Date();

  constructor() { }

  ngOnInit() {
  }
}
