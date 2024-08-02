import firebase from 'firebase/app'
// import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyJmiSlgJBaOg8bVFI7lG-kaimnnISJWY",
  authDomain: "food-schedule-crud.firebaseapp.com",
  projectId: "food-schedule-crud",
  storageBucket: "food-schedule-crud.appspot.com",
  messagingSenderId: "165016684483",
  appId: "1:165016684483:web:fe316bc517cc1979129f76"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export default firebase;