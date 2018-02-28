import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController,Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { ResetPage } from '../pages';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  loading: Loading;
  account: { email: string } = {
    email: 'appuser1@gmail.com'
  };	
  private ForgotErrorString: string;
  private ForgotSuccessString: string;
  private LoaderMessage:string; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,
    public user: User,
    private loadingCtrl: LoadingController,
    public translateService: TranslateService) {


    this.translateService.get(["FORGOT_ERROR","FORGOT_SUCCESS","LOADER_MSG"]).subscribe((values) => {
      this.ForgotErrorString    = values.FORGOT_ERROR;
      this.ForgotSuccessString  = values.FORGOT_SUCCESS;
      this.LoaderMessage        = values.LOADER_MSG;
    });
  }

  createLoader(message: string = this.LoaderMessage) { // Optional Parameter
     this.loading = this.loadingCtrl.create({
       content: message
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }
  //user reset password by passing email
  RequestForgot() {
    // Show the popup
    this.createLoader();
    this.loading.present().then(() => {
        var data   = {"email": this.account.email};        
        this.user.forgot(data).subscribe((resp:any) => {
            this.loading.dismiss();
            let toast = this.toastCtrl.create({
              message: resp.message || this.ForgotSuccessString,
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.navCtrl.push(ResetPage,resp); 
            
            
        }, (err) => {
            // Unable to log in
            this.loading.dismiss();
            let toast = this.toastCtrl.create({
              message: err.error.error[0] || this.ForgotErrorString,
              duration: 3000,
              position: 'top'
            });
            toast.present();
        });
    });
  }

}
