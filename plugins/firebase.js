// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "**************",
    authDomain: "**************",
    databaseURL: "**************",
    projectId: "**************",
    storageBucket: "**************",
    messagingSenderId: "**************",
    appId: "**************"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}