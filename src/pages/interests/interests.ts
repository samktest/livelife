import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController,Loading, LoadingController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { InterestProvider } from '../../providers/providers';

/**
 * Generated class for the InterestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {
  
  loading: Loading;
  showSubmit = false;
  interestdata: { id: number };	
  private Interestinfo: any;
  private InterestErrorString: string;
  private InterestSuccessString: string;
  private LoaderMessage:string; 

  constructor(public user: User,public navCtrl: NavController, public interest:InterestProvider, public navParams: NavParams,public menu: MenuController, public toastCtrl: ToastController,    
    private loadingCtrl: LoadingController,
    public translateService: TranslateService) {
    
   //console.log(this.user._user);
   this.interest.getinterestlist(this.user._user).subscribe((resp) => {

    this.Interestinfo = resp;
    console.log(this.Interestinfo);
   });

  }

  ShowSubmit(CheckedInterest:any){
    
    let server = this.Interestinfo.find(x => x.checked === true);
    
    if(server !== undefined && server.checked==true) {
      this.showSubmit=true;
    }
    else {
      this.showSubmit=false;
    }

  }
  ionViewDidLoad() {
    this.menu.close();
  }

}
