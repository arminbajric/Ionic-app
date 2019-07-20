import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CwindowPage } from './cwindow.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   FormsModule,
   ReactiveFormsModule
  ],
  declarations: [CwindowPage],
 
})
export class CwindowPageModule {}
