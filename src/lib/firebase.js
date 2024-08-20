// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCssee9kOmiF72W4eJSd5OyaVwCtn-ElW4",
  authDomain: "chatify01.firebaseapp.com",
  projectId: "chatify01",
  storageBucket: "chatify01.appspot.com",
  messagingSenderId: "44663283127",
  appId: "1:44663283127:web:6cb7553d694a9e8f0b5c32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
