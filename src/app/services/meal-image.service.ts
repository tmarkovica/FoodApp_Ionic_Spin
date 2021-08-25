import { Injectable, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import firebase from 'firebase/app';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class MealImageService implements OnInit {

  cloudFiles : Image[] = [];

  constructor(
    private firebaseApp: FirebaseApp
  ) { this.loadFiles()}

  ngOnInit() {
    console.log("call ng init");
    
    this.loadFiles();
  }

  private encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, mealName){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('meal-images').child(mealName);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  loadFiles() {
    this.cloudFiles = [];

    const storageRef = this.firebaseApp.storage().ref('meal-images');

    storageRef.listAll().then(result => {

      result.items.forEach(async (ref : any) => {
        this.cloudFiles.push({
          name: ref.name,
          full: ref.fullPath,
          ref,
          url: await ref.getDownloadURL()
        });        
      });
    }).then(res => {
      console.log("cloudFiles: ", this.cloudFiles);
    });
  }

  getImageByName(mealName : string) {
    return this.cloudFiles.find(image => image.name === mealName)?.url;
  }
}