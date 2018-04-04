import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, NavParams, Platform } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../pages';
import { Storage } from '@ionic/storage';
export interface Question {
  id:number,
  name: string;
  option_catalogues: any;
  option_id: number;
}
export interface Answers {
  question_id:number,
  option_id: number;
}
@IonicPage()
@Component({
  selector: 'page-entryquestions',
  templateUrl: 'entryquestions.html',
})
export class EntryquestionsPage {
  
  userdata: any;
  questions: Question[];
  answers: Answers[];
  showSkip = true;
  dir: string = 'ltr';

  @ViewChild(Slides) slides: Slides;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, translate: TranslateService, public platform: Platform) {
    
      if(this.navParams.data.length>0)
      {
        this.questions = this.navParams.data || [];
      }
      
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    //slider.lockSwipes(true);
    this.showSkip = !slider.isEnd();
  }

  slideNext(){
    this.slides.slideNext();
  }
  //save answers to database when user signup
  Saveanswers(){
    
    this.answers = this.questions.map( ques => {
      return { question_id: ques.id, option_id: Number(ques.option_id) };
    });

    console.log(this.answers);
  }
  
  //check view user valid or not
  ionViewCanEnter() {
    // Check user is loggedin or not
    this.storage.get('userdata').then((data) => {
    if(!data.auth_token)
    {
      this.navCtrl.push(LoginPage);  
    }
    });
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }    

}
