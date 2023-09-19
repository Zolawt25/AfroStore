// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQJD0h8y0zIUuBote233bv08JhZPyZtzM",
  authDomain: "afrostore-77239.firebaseapp.com",
  projectId: "afrostore-77239",
  storageBucket: "afrostore-77239.appspot.com",
  messagingSenderId: "377154920589",
  appId: "1:377154920589:web:fc4331001d1e777d4a82c4",
  measurementId: "G-KTDN7V1EM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app