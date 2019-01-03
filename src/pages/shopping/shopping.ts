import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { WebIntent } from '@ionic-native/web-intent';
import { Market } from '@ionic-native/market';
/**
 * Generated class for the ShoppingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  datas:any

  constructor(public navCtrl: NavController,public apiProvider:ApiProvider, public market: Market, public navParams: NavParams,private webIntent: WebIntent) {
 
 this.get()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingPage');
  }

  get(){
    this.apiProvider.getData('shopping_api.php').then(data=> {
       console.log(data)
     this.datas=data
       console.log(this.datas)
   
     
     })
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
