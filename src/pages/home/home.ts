import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
;
import 'rxjs/Rx';
import { ToastController } from 'ionic-angular';
import {tap} from 'rxjs/operators';
import {FcmProvider} from '../../providers/fcm/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public info;
  public pendingList;

  constructor(
     private firestore: AngularFirestore, 
     public navCtrl: NavController,
  public fcm: FcmProvider,
  private toastCtrl: ToastController){
     this.initialize();
}

  ionViewDidLoad(){

   this.fcm.getToken();
  this.fcm.listenToNotifications().pipe(
    tap(msg =>{
        const toast=this.toastCtrl.create({
          message:msg.body,
          duration:3000
        });
        toast.present();
        })
  ).subscribe();
  
}
  

 
  initialize() {
    this.pendingList = [];
    this.info=[];
    var temp;

    this.firestore.collection('clients').ref.onSnapshot((snapshot ) => {
     
      snapshot.forEach((doc) => {
        doc.ref.collection('transactions').where("pending", "==", true).onSnapshot((s) => {
          
          s.forEach((d) => {
            
            temp = {
              phone: doc.id,
              fname: doc.data().account.fname,
              lname: doc.data().account.lname,
              id: d.id,
            };
           let c = d.data();
           this.info.push(temp);
           this.pendingList.push(c);
        

          });

        });
      });
    });
    

    
  }

  changePendingStatus(index) {
    console.log(index);
    this.firestore.collection('clients').doc(this.info[index].phone).collection('transactions').doc(this.info[index].id).update({
      pending: false,
    }).then(()=>{
      this.initialize();
    })
  }
  deleteTransaction(index) {
    this.firestore.collection('clients').doc(this.info[index].phone).collection('transactions').doc(this.info[index].id).delete().then(() => {
      this.initialize();
    })
  }

}
