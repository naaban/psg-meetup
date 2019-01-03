import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  datas:any
  constructor(public navCtrl: NavController,public apiProvider:ApiProvider, public navParams: NavParams) {
  this.get()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }

  get(){
    this.apiProvider.getData('gallery_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
  
     
     })
   }

}
