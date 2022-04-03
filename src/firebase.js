import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "",
    authDomain: "nusustainability.firebaseapp.com",
    projectId: "nusustainability",
    storageBucket: "nusustainability.appspot.com",
    messagingSenderId: "834016048965",
    appId: "1:834016048965:web:238646fc69ac4436f5702c",
    measurementId: "G-3DSF7RV438"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
