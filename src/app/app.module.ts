import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CwindowPage } from './pages/cwindow/cwindow.page';
import { CwindowPageModule } from './pages/cwindow/cwindow.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents:[CwindowPage],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
     ReactiveFormsModule,
    HttpClientModule,
    CwindowPageModule
  ],
  providers: [
    
    CookieService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports:[
    ReactiveFormsModule,
    FormsModule
  ],
 
})
export class AppModule { }
