// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDjCc4IsrBesYlmlJDP2hekaO6gvl5lFcM',
  authDomain: 'pmobile-auth.firebaseapp.com',
  databaseURL:
    'https://pmobile-auth-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'pmobile-auth',
  storageBucket: 'pmobile-auth.appspot.com',
  messagingSenderId: '274995731282',
  appId: '1:274995731282:web:aed08df61f84eed2cbf88b',
  measurementId: 'G-ETYQMP7YZW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

const auth = getAuth(app);

export {auth, database, firestore};
