import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})
export class NewMealPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  cancelAddingNewMeal() {
    this.router.navigate(['/web/menu'], {replaceUrl : true});
  }
}
