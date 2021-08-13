import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-days-navbar',
  templateUrl: './days-navbar.component.html',
  styleUrls: ['./days-navbar.component.scss']
})
export class DaysNavbarComponent implements OnInit {

  days = [1,2,3,4,5];
  daysNames = ["MON", "TUE", "WED", "THU", "FRI"];
  daysNamesCro = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];

  currentDay = 1;

  @Output() changed = new EventEmitter<number>();

  constructor() { }

  private logCurrentDay() {
    console.log(`currentDay = ${this.daysNamesCro[this.currentDay - 1]}`);
  }

  ngOnInit() {
    this.logCurrentDay();
    this.changed.emit(this.currentDay);
  }

  changeDay(day: number){
    this.currentDay = day;
    this.changed.emit(this.currentDay);
  }
}