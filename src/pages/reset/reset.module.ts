import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPage } from './reset';

@NgModule({
  declarations: [
    ResetPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPage),
    TranslateModule.forChild()
  ],
  exports: [
    ResetPage
  ]
})
export class ResetPageModule {}
