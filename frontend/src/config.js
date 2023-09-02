import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCvdNoMD2DQ0U2zT99xrDyZQ8zILA9dF18",
  authDomain: "team-edit-9da40.firebaseapp.com",
  databaseURL:
    "https://team-edit-9da40-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "team-edit-9da40",
  storageBucket: "team-edit-9da40.appspot.com",
  messagingSenderId: "148236942774",
  appId: "1:148236942774:web:2453af9769b9cc11479517",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
export { auth, provider };
