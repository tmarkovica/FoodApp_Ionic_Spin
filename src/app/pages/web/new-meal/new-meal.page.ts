import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { NavController } from '@ionic/angular';
import { MealImageService } from 'src/app/services/meal-image.service';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.page.html',
  styleUrls: ['./new-meal.page.scss'],
})
export class NewMealPage implements OnInit {

  mealName: string = "";
  mealDescription: string = "";
  soup: boolean = false;
  salad: boolean = false;
  bread: boolean = false;

  processing: boolean;
  uploadImage: string;


  constructor(
    private router: Router,
    private restaurauntService: RestaurantService,
    private toastController: ToastController,
    public navCtrl: NavController,
    private mealImageService : MealImageService) { }

  ngOnInit() {
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'You added new dish to restaurant.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  private emptyInputElements() {
    this.mealName = "";
    this.mealDescription = "";
    this.soup = false;
    this.salad = false;
    this.bread = false;
  }

  private uploadImageToFirebase() {

    this.mealImageService.uploadImage(this.uploadImage, this.mealName).then(val => {
      console.log("Image uploaded.");
      this.presentToast();
      this.removePic();
      this.emptyInputElements();
      this.mealImageService.loadFiles();
    });
  }

  addNewMeal() {
    console.log(`${this.mealName}, ${this.mealDescription}, ${this.soup}, ${this.salad}, ${this.bread}`);

    this.restaurauntService.addNewMeal(this.mealName, this.mealDescription, this.soup, this.salad, this.bread).then(val => {
      if (val === null)
        this.uploadImageToFirebase();
    });
  }

  cancelAddingNewMeal() {
    this.router.navigate(['/web/menu'], { replaceUrl: true });
  }

  // meal image
  presentActionSheet(fileLoader) {
    fileLoader.click();
    var that = this;
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      console.log("uri", URL.createObjectURL(file));
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        that.processing = true;
        that.getOrientation(fileLoader.files[0], function (orientation) {
          if (orientation > 1) {
            that.resetOrientation(reader.result, orientation, function (resetBase64Image) {
              that.uploadImage = resetBase64Image;
            });
          } else {
            that.uploadImage = reader.result.toString();
          }
        });
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  imageLoaded() {
    this.processing = false;
  }

  private getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e: any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }

  private resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }
      // draw image
      ctx.drawImage(img, 0, 0);
      // export base64
      callback(canvas.toDataURL());
    };
    img.src = srcBase64;
  }

  removePic() {
    this.uploadImage = null;
  }
}