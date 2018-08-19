import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);



    exports.newTransactionfunctions= functions.firestore.document('clients/{clientsId}/transactions/{transactionsId}').onCreate(async event =>{
    console.log('triggered');
    const data=event.data();
        const user=event.ref.parent.parent.id;
    const payload={
        notification:{
            title: 'New Transaction',
            body: user+' Has made a new transaction!'
        }
    }

    const db=admin.firestore();
    const devRef=db.collection('devices');

    const devices= await devRef.get();

    const tokens=[];

    devices.forEach(result =>{
        const token=result.data().token;
        tokens.push(token);

    });

    return admin.messaging().sendToDevice(tokens, payload);
});
