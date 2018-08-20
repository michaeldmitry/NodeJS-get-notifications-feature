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


//Each device has a special token, so we get it (using firebase plugin) and save it so that notifications could be sent to that token
  async getToken(){
    let token;
//Check platforms, ios has an additional step unlike android
    if(this.platform.is('ios')){
      token =await this.firebaseNative.getToken();
        const perm= await this.firebaseNative.grantPermission();
        console.log(token);
      }

      if(!this.platform.is('cordova')){
       token="web";
       console.log(token);
      }
      if(this.platform.is('android')){
       token =await this.firebaseNative.getToken();
      }

      //We need to save it on our database so call responsible function
        return this.saveTokenToFirestore(token);
  }

private saveTokenToFirestore(token){
if(!token) return;

//save the device's token in a new collection called devices 
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
