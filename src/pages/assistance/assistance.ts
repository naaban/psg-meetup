import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { FormBuilder, Validators } from '@angular/forms';
import {Storage } from '@ionic/storage'

/**
 * Generated class for the AssistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assistance',
  templateUrl: 'assistance.html',
})
export class AssistancePage {

params:any;
response:any;
data:any
  constructor(public navCtrl: NavController,public strorage : Storage, public apiProvider : ApiProvider, public navParams: NavParams,public toastCtrl: ToastController,  public formBuilder: FormBuilder) {

    this.params = this.formBuilder.group({
      message: ['', Validators.compose([Validators.required,])],

    })
  }

 
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad AssistancePage');
  }

  usrDet : any;
  next(){
    if (this.params.valid){
      Object.assign(  this.params.value)
     

      this.strorage.get("mail").then(mail => {
        console.log(mail)
        this.apiProvider.postData({user_email : mail} , '/profile_api.php').then(userDet => {
          console.log(userDet)
          this.usrDet  = userDet ;
          let data={
            user_message:this.params.value.message,
            user_name : this.usrDet.user_name,
            id : this.usrDet.id
          }
          
                console.log(data)
                this.apiProvider.postData(data, 'feedback_msg.php').then(data => {
                  console.log(data)
                  this.response=data
                  if(this.response.status==true){
                 
                  //  this.ionViewDidEnter()
            
          
                  this.presentToast("Feedback sent")
                this.params.reset()
                
                    // this.presentToast("Message Send Successfully")
                  // this.navCtrl.setRoot(PayprocessPage)
                 
                }
                })
              
        })
      })
      

    
    }
    else {
        this.presentToast("Message Empty")
      }
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
