import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

export interface Question {
  question_id:number,
  title: string;
  options: any;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-entryquestions',
  templateUrl: 'entryquestions.html',
})
export class EntryquestionsPage {
  
  questions: Question[];
  showSkip = true;
  dir: string = 'ltr';

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform) {
  	this.dir = platform.dir();
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        
        this.questions = [
          {
            question_id:1,
            title: values.TUTORIAL_SLIDE1_TITLE,
            options: [{title:"Option 1",value:1},{title:"Option 2",value:2}],
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            question_id:2,
            title: values.TUTORIAL_SLIDE2_TITLE,
            options: [{title:"Question 1",value:1},{title:"Option 2",value:2}],
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            question_id:3,
            title: values.TUTORIAL_SLIDE3_TITLE,
            options: [{title:"Question 1",value:1},{title:"Option 2",value:2}],
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];

      });
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    
    if(slider.isEnd())
    {
    console.log(this.questions);
    }
    
    //slider.lockSwipes(true);
    this.showSkip = !slider.isEnd();
  }

  slideNext(){
    this.slides.slideNext();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
