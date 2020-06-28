import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/firestore';
import 'firebase/storage'
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyBXgnKi__P5f55XXJ1LwuVplvCwrDfWYjI",
    authDomain: "eople123-3d560.firebaseapp.com",
    databaseURL: "https://eople123-3d560.firebaseio.com",
    projectId: "eople123",
    storageBucket: "eople123.appspot.com",
    messagingSenderId: "314969181819",
    appId: "1:314969181819:web:342ed2e5a0fc55ed71dcde"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const storage=firebase.storage()
// const b={db}
export {
    db,storage 
} 