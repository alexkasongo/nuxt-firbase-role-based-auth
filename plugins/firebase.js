// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDBxoeI41sF7Cg16q2m734PQ4Ja3_FSj7s",
    authDomain: "role-based-auth-ce7eb.firebaseapp.com",
    databaseURL: "https://role-based-auth-ce7eb.firebaseio.com",
    projectId: "role-based-auth-ce7eb",
    storageBucket: "role-based-auth-ce7eb.appspot.com",
    messagingSenderId: "220803853305",
    appId: "1:220803853305:web:1e8a5e3399add2d44f2b28"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}