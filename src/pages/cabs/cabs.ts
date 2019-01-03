import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WebIntent } from '@ionic-native/web-intent';
import { Market } from '@ionic-native/market';
/**
 * Generated class for the CabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cabs',
  templateUrl: 'cabs.html',
})
export class CabsPage {
datas:any
  constructor(public navCtrl: NavController,public apiProvider:ApiProvider, public navParams: NavParams,private webIntent: WebIntent, public market: Market) {
 this.get()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CabsPage');
  }


  get(){
    this.apiProvider.getData('cab_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
  
     
     })
   }

   phto: any = "";
   hideClg : boolean = false;
   setImg(){
   this.phto='base64' + this.datas.logo;
   }
  go(event){
    console.log(event)
    this.market.open(event.link);
    // const options = {
    //   action: this.webIntent.ACTION_VIEW,
    //   url: event.link,
    //   type: 'application/vnd.android.package-archive'
    // };
  }
}
