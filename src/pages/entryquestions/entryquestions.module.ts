import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryquestionsPage } from './entryquestions';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EntryquestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryquestionsPage),
    TranslateModule.forChild()
  ],
  exports: [
    EntryquestionsPage
  ]
})
export class EntryquestionsPageModule {}
