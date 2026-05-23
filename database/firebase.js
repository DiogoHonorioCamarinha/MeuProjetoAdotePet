import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE7-E4YJDGf6ZAVojk2LT0AC2gSiSTYWI",
  authDomain: "meu-app-sexta-67b6f.firebaseapp.com",
  projectId: "meu-app-sexta-67b6f",
  storageBucket: "meu-app-sexta-67b6f.firebasestorage.app",
  messagingSenderId: "116759070057",
  appId: "1:116759070057:web:0936ed4d69453b883d69f8",
  measurementId: "G-QP2YSP76CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const autenticacao = getAuth(app);
const db = getFirestore(app);

export { autenticacao, db };