import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})
export class NewMealPage implements OnInit {

  mealName : string = "";
  mealDescription : string = "";
  soup : boolean = false;
  salad : boolean = false;
  bread : boolean = false;

  constructor(
    private router : Router, 
    private restaurauntService : RestaurantService,
    private toastController : ToastController) { }

  ngOnInit() {
  }

  cancelAddingNewMeal() {
    this.router.navigate(['/web/menu'], {replaceUrl : true});
  }

  addNewMeal(){
    
    console.log(`${this.mealName}, ${this.mealDescription}, ${this.soup}, ${this.salad}, ${this.bread}`);
    
    this.restaurauntService.addNewMeal(this.mealName, this.mealDescription, this.soup, this.salad, this.bread);

    this.mealName = "";
    this.mealDescription = "";
    this.soup = false;
    this.salad = false;
    this.bread = false;

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You added new dish to restaurant.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  image : string;
  file: File;
  uri :string;

  chooseImage($event : any) {
    this.image = `url("assets/restorani/restoran1.jpg")`;

    try {
      this.file = $event.target.files[0];
      console.log(this.file);
    } catch(err) {
      console.log(err);
    }
    

    console.log($event);
    console.log($event.detail.value);
    this.image = $event.target;
    
    console.log($event.input);

    this.uri = $event.path[0].baseURI;
    console.log(this.uri);
    
    
  }
}