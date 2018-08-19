import { Injectable } from '@angular/core';
import {Platform} from 'ionic-angular';
import {AngularFirestore} from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';

/*Generated class for the FcmProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(private platform:Platform,private afs:AngularFirestore,public firebaseNative:Firebase) {
    console.log('Hello FcmProvider Provider');
  }



  async getToken(){
    let token;

    if(this.platform.is('ios')){
      token =await this.firebaseNative.getToken();
        const perm= await this.firebaseNative.grantPermission();
        console.log(token);
      }

      if(!this.platform.is('cordova')){
        // token =await this.firebaseNative.getToken();
       token="web";
       console.log(token);
      }
      if(this.platform.is('android')){
       token =await this.firebaseNative.getToken();
          //token='android';
      }
        
        
        

        

        return this.saveTokenToFirestore(token);
  }

private saveTokenToFirestore(token){
if(!token) return;

const clientsRef= this.afs.collection('devices');
const docData ={
  token
}

return clientsRef.doc(token).set(docData);
}

listenToNotifications(){
  return this.firebaseNative.onNotificationOpen();
}
}
