import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Rest of your code remains the same


const firebaseConfig = {
    apiKey: "AIzaSyDMq5RKd_aXHSYbgxdkqUo5y7kMiYHP5yE",
    authDomain: "proshops-37c1d.firebaseapp.com",
    projectId: "proshops-37c1d",
    storageBucket: "proshops-37c1d.appspot.com",
    messagingSenderId: "494523737293",
    appId: "1:494523737293:web:7d4e024c321e0e332eb584",
    measurementId: "G-TSX03G4GSC"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Set persistence to local storage if session storage is inaccessible
try {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
} catch (error) {
  console.error('Error setting Firebase persistence:', error);
}

try {
  sessionStorage.setItem('testKey', 'testValue');
  const testValue = sessionStorage.getItem('testKey');
  console.log('Test value:', testValue);
} catch (error) {
  console.error('Error accessing session storage:', error);
}

export { auth };
export const provider = new firebase.auth.GithubAuthProvider();
export default firebase;