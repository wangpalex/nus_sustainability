import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDARf9oIw18L2aTg3-CpYQrpcjBT1NghnE",
    authDomain: "nusustainability.firebaseapp.com",
    projectId: "nusustainability",
    storageBucket: "nusustainability.appspot.com",
    messagingSenderId: "834016048965",
    appId: "1:834016048965:web:238646fc69ac4436f5702c",
    measurementId: "G-3DSF7RV438"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;