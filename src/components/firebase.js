import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAELFhVwsFIGvw7n-LN4E_Wnam8nIKciI",
    authDomain: "landing-page-dc319.firebaseapp.com",
    projectId: "landing-page-dc319",
    storageBucket: "landing-page-dc319.appspot.com",
    messagingSenderId: "726539322998",
    appId: "1:726539322998:web:321dd72dd463a46a33c157",
    measurementId: "G-SJ2RSHSCGD"   };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
