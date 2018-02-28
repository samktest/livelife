import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InterestsPage } from './interests';

@NgModule({
  declarations: [
    InterestsPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestsPage),
    TranslateModule.forChild()
  ],
})
export class InterestsPageModule {}
