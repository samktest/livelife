import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController,Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { LoginPage } from '../pages';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  loading: Loading;
  account: { password_token: string,email: string,password:any } = {
    password_token: '',
    email: 'appuser1@gmail.com',
    password: 'appuser1'
  };	
  private tokeninfo: any;
  private ResetErrorString: string;
  private ResetSuccessString: string;
  private TokenErrorString: string;
  private LoaderMessage:string; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,
    public user: User,
    private loadingCtrl: LoadingController,
    public translateService: TranslateService) {
    this.translateService.get(["RESET_ERROR","RESET_SUCCESS","TOKEN_ERROR","LOADER_MSG"]).subscribe((values) => {
      this.ResetErrorString    = values.RESET_ERROR;
      this.ResetSuccessString  = values.RESET_SUCCESS;
      this.TokenErrorString    = values.TOKEN_ERROR;
      this.LoaderMessage       = values.LOADER_MSG;
    });
    //set received to local variable to check when user submit token
    console.log(this.navParams.data);
    if(this.navParams.data!='')
    {
      this.tokeninfo = this.navParams.data.password_token || "";
      console.log(this.tokeninfo);
    }
  }

  createLoader(message: string = this.LoaderMessage) { // Optional Parameter
     this.loading = this.loadingCtrl.create({
       content: message
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }
  //user reset password by passing email
  RequestReset() {
    // Show the popup
    this.createLoader();
    this.loading.present().then(() => {
        var data   = {"email": this.account.email,"password_token":this.account.password_token,"password":this.account.password};
        if(this.tokeninfo==this.account.password_token)
        {
          this.user.reset(data).subscribe((resp) => {
              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                message: this.ResetSuccessString,
                duration: 3000,
                position: 'top'
              });
              toast.present();
              this.navCtrl.push(LoginPage); 
          }, (err) => {
              // Unable to reset password
              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                message: err.error.error[0] || this.ResetErrorString,
                duration: 3000,
                position: 'top'
              });
              toast.present();
          });
        }
        else
        {
              // Unable to reset password bcoz of token mismatched
              this.loading.dismiss();
              let toast = this.toastCtrl.create({
                message: this.TokenErrorString,
                duration: 3000,
                position: 'top'
              });
              toast.present();
        }
    });
  }

}
