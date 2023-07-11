import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Rest of your code remains the same

const firebaseConfig = {
    apiKey: "AIzaSyApdscF-07MHEZp9ZPGrcDpE9oAXKqRFFE",
    authDomain: "realchat-87685.firebaseapp.com",
    databaseURL: "https://realchat-87685-default-rtdb.firebaseio.com",
    projectId: "realchat-87685",
    storageBucket: "realchat-87685.appspot.com",
    messagingSenderId: "474925934763",
    appId: "1:474925934763:web:e536f3ecf3d54aedfeafee",
    measurementId: "G-0H05XJ2EZX"
};

firebase.initializeApp(firebaseConfig);

export default firebase;