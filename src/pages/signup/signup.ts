import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
import { EntryPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  loading: Loading;
  
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string, password_confirmation: string, username: string, device_id: any } = {
    name: 'appuser1',
    email: 'appuser1@gmail.com',
    password: 'appuser1',
    password_confirmation: 'appuser1',
    username: 'appuser1',
    device_id: 'appuser1'
  };

  // Our translated text strings
  private signupErrorString: string;
  private signupSuccessString: string;

  constructor(private storage: Storage, public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public translateService: TranslateService) {

    this.translateService.get(['SIGNUP_ERROR','SIGNUP_SUCCESS']).subscribe((values) => {
      this.signupErrorString = values.SIGNUP_ERROR;
      this.signupSuccessString = values.SIGNUP_SUCCESS;
    });
  }
  
  //create loader for loading
  createLoader(message: string = "Please wait...") { // Optional Parameter
     this.loading = this.loadingCtrl.create({
       content: message
     });
   }

  doSignup() {
    // Attempt to login in through our User service
    this.createLoader();
    this.loading.present().then(() => {
      this.user.signup(this.account).subscribe((resp) => {
          
          // I've added this timeout just to show the loading popup more time
          setTimeout(() => {
            this.loading.dismiss();
          }, 1000);

          this.getEntryQuestions(resp);

      }, (err) => {

        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    });
  }
  
  //Get signup questions list 
  getEntryQuestions(reqdata) {
    this.user.entryquestions(reqdata).subscribe((resp) => {
      
      this.storage.set('entryquestions', resp);
      this.navCtrl.push(EntryPage,resp);
        
      //sign up successfully redirect to entry questions
      let toast = this.toastCtrl.create({
        message: this.signupSuccessString,
        duration: 3000,
        position: 'top'
      });
      toast.present();

    }, (err) => {

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }
}
