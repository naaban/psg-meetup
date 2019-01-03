import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Page2Page } from '../page2/page2';
import { ApiProvider } from '../../providers/api/api';
import { PayprocessPage } from '../payprocess/payprocess';

import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  // queries: {
  //   content: new ViewChild('content')
  // }

})
export class ChatPage {

  @ViewChild(Content) content: Content;
  params: any;
  datas: any;
  myArray: any;
  response: any;
  constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder, public storage: Storage) {

    this.params = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required,])],

    })
    storage.get("user_details").then(data => {
      if(data == null) {
        storage.get("mail").then(mail => {
          if(mail != null) {
            apiProvider.postData({user_email : mail} , '/profile_api.php').then(data => {
              this.datas = data
              storage.set("user_details" , data)
            })
          }
          else {
            navCtrl.setRoot(HomePage)
            this.presentToast("Please fill the form to proceed")
          }
         
        })
      }
      
    })
  
    this.get()
  }

  get() {
    this.apiProvider.getData('message.php').then(data => {
      console.log(data)
      this.datas = data
      console.log(this.datas)
      if(this.datas!= null) {
        this.scrollToBottom()
      }
    

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  send() {

    if (this.params.valid) {
      Object.assign(this.params.value)

      this.storage.get("user_details").then(user_data => {
        let data = {
          user_message: this.params.value.message,
          user_name: user_data.user_name
   
  }
  
        console.log(data)
        this.apiProvider.postData(data, 'summa_chat.php').then(data => {
          console.log(data)
          this.response = data
          if (this.response.status == true) {
            this.get()
            //  this.ionViewDidEnter()
            this.scrollToBottom()
  
            this.params.reset()
  
            // this.presentToast("Message Send Successfully")
            // this.navCtrl.setRoot(PayprocessPage)
  
          }
          else {
            this.presentToast("Message Empty")
          }
          })
        })
  
  
      }
      
      
  }


  ionViewDidEnter() {
    this.content.scrollToBottom(300);//300ms animation speed
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
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
