import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController,Loading, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../providers/providers';
// import { MainPage } from '../pages';
// import { ForgotPage } from '../pages';
import { EntryPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  loading: Loading;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'appuser12@gmail.com',
    password: 'appuser1'
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginSuccessString: string;
  private loginLoadingString: string;
  private LoaderMessage:string; 
  public loadingPopup:any;
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams,
    public user: User,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public translateService: TranslateService) {

    this.translateService.get(["LOGIN_ERROR","LOGIN_LOADING","LOGIN_SUCCESS","LOADER_MSG"]).subscribe((values) => {
      this.loginErrorString   = values.LOGIN_ERROR;
      this.loginLoadingString = values.LOGIN_LOADING;
      this.loginSuccessString = values.LOGIN_SUCCESS;
      this.LoaderMessage        = values.LOADER_MSG;
    });
  }
  //check logged in user and redirect to question page
  ionViewCanEnter() {
    // Check user is loggedin or not
    this.storage.get('userdata').then((data) => {
      if(data!==null){
        //this.navCtrl.push(MainPage);  
        this.getEntryQuestions(data);
      }
    });
  }

  createLoader(message: string = "Please wait...") { // Optional Parameter
     this.loading = this.loadingCtrl.create({
       content: message
     });
   }

  //Attempt to login in through our User service
  doLogin() {
    // Show the popup
    this.createLoader();
    this.loading.present().then(() => {
        //var data = JSON.stringify({"email": this.account.email,"password": this.account.password});
        var data   = {"email": this.account.email,"password": this.account.password};
        //var data   = JSON.stringify({"userdata":{"email_login": this.account.email,"password": this.account.password}});

        this.user.login(data).subscribe((resp) => {
          this.loading.dismiss();
          //this.navCtrl.push(MainPage); 

        }, (err) => {
          // Unable to log in
          this.loading.dismiss();
          let toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
    });
  }
  ForgotPassword(){
    this.navCtrl.push('ForgotPage');
  }
  signup() {
    this.navCtrl.push('SignupPage');
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
