import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);


//create a cloud function so that firestore gets triggered and sends notifications
   //Trigger whenever there is a new transaction
    exports.newTransactionfunctions= functions.firestore.document('clients/{clientsId}/transactions/{transactionsId}').onCreate(async event =>{
    console.log('triggered');
    const data=event.data();
        const user=event.ref.parent.parent.id;  //Get the user's phone number (the one who made the new transaction)
    //Customize how the notifcation would look like and contain
    const payload={
        notification:{
            title: 'New Transaction',
            body: user+' Has made a new transaction!'
        }
    }

    const db=admin.firestore();
    const devRef=db.collection('devices');  

    const devices= await devRef.get();

    const tokens=[];    //initialize an empty array to save the tokens on firestore to send the notifications to

    devices.forEach(result =>{
        const token=result.data().token;
        tokens.push(token);

    });

    //Send the notifcation to all device tokens saved on firestore with the payload customized notification
    return admin.messaging().sendToDevice(tokens, payload);
});
