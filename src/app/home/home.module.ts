import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { CwindowPage } from '../pages/cwindow/cwindow.page';
import { CwindowPageModule } from '../pages/cwindow/cwindow.module';
const routes: Routes = [
  
  {
    path: 'chat',
    component: HomePage,
   
    children:[
      { path: 'messages', loadChildren: '../pages/messages/messages.module#MessagesPageModule' },
      { path: 'users', loadChildren: '../pages/users/users.module#UsersPageModule' },
      { path: 'settings', loadChildren: '../pages/settings/settings.module#SettingsPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'signin',
    pathMatch:'full'
  },
  { path: 'signin', loadChildren: '../pages/signin/signin.module#SigninPageModule' },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CwindowPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  
})
export class HomePageModule {}
