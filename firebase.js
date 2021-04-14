// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA3E64vK_x0kqahKQfN5bZXIGk85cakAV4",
    authDomain: "chit-chat-392aa.firebaseapp.com",
    projectId: "chit-chat-392aa",
    storageBucket: "chit-chat-392aa.appspot.com",
    messagingSenderId: "1054709161153",
    appId: "1:1054709161153:web:d4503fa46ec758a101c840",
    measurementId: "G-K4LBW7V7KT"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider}