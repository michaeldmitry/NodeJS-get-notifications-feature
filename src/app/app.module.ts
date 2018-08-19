import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from 'angularfire2';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';


// Initialize Firebase
var firebase = {
  // apiKey: "AIzaSyAyQm9eGas86gwusWjDe_nVZEIQ0BaMveE",
  // authDomain: "trial-2d12e.firebaseapp.com",
  // databaseURL: "https://trial-2d12e.firebaseio.com",
  // projectId: "trial-2d12e",
  // storageBucket: "trial-2d12e.appspot.com",
  // messagingSenderId: "753010353270"
 apiKey: "AIzaSyCEzA5WIt5dbqRqNIMjOsl9WbuEzsz7B0Y",
 authDomain: "fiery-heat-9860.firebaseapp.com",
 databaseURL: "https://fiery-heat-9860.firebaseio.com",
 projectId: "fiery-heat-9860",
 storageBucket: "fiery-heat-9860.appspot.com",
 messagingSenderId: "959812971783"
 };
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
     AngularFireAuthModule,
     AngularFireDatabaseModule,
      AngularFirestoreModule
      ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
  
    {provide: ErrorHandler, useClass: IonicErrorHandler},
   
    FcmProvider
  ]
})
export class AppModule {}
