import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Page3Page } from '../page3/page3';
import { ApiProvider } from '../../providers/api/api';
import { BookuroomPage } from '../bookuroom/bookuroom';
import { Page2Page } from '../page2/page2';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  response:any = {
    day1 : [],
    day2 : [],
    day3 : []
  }
  params:any
thirddatas:any
  constructor(public navCtrl: NavController,public storage: Storage,public navParams: NavParams,public apiProvider:ApiProvider ,public toastCtrl:ToastController) {
    // this.thirddatas = navParams.get("sdatas");
    // console.log(this.thirddatas)


    storage.get("event").then(data => {
      if(data != null) {
        this.thirddatas = data
        console.log(this.thirddatas)
      }
      else  {
        this.thirddatas=navParams.get('sdatas')
        console.log(this.thirddatas)
      }
    })
    

// viewevent

apiProvider.getData('view_event.php').then(data=> {
  console.log(data)
  this.response = data
  console.log(this.response)

})

  }

  back(){
    this.navCtrl.pop()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }


  button(){

    this.storage.set("event" , this.thirddatas)
    console.log(this.thirddatas);
    this.navCtrl.push(BookuroomPage,{fdatas: this.thirddatas})
  }

  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
