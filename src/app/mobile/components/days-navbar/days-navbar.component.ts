import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-days-navbar',
  templateUrl: './days-navbar.component.html',
  styleUrls: ['./days-navbar.component.scss'],
})
export class DaysNavbarComponent implements OnInit {

  days = [1, 2, 3, 4, 5];
  daysNames = ["MON", "TUE", "WED", "THU", "FRI"];
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  @Output() changed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.logCurrentDay();
    this.changed.emit(this.currentDay);
  }

  private logCurrentDay() {
    console.log(`currentDay = ${this.daysNamesCro[this.currentDay - 1]} --> daysNavbarMobile`);
  }

  changeDay(day: number) {
    this.currentDay = day;
    this.logCurrentDay();
    this.changed.emit(this.currentDay);
  }
}
