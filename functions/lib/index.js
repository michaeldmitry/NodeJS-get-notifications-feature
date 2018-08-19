"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.newTransactionfunctions = functions.firestore.document('clients/{clientsId}/transactions/{transactionsId}').onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    console.log('triggered');
    const data = event.data();
    const user = event.ref.parent.parent.id;
    const payload = {
        notification: {
            title: 'New Transaction',
            body: user + ' Has made a new transaction!'
        }
    };
    const db = admin.firestore();
    const devRef = db.collection('devices');
    const devices = yield devRef.get();
    const tokens = [];
    devices.forEach(result => {
        const token = result.data().token;
        tokens.push(token);
    });
    return admin.messaging().sendToDevice(tokens, payload);
}));
//# sourceMappingURL=index.js.map