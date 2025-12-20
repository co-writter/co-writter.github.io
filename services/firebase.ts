
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "co-writter-51007753.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "co-writter-51007753",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "co-writter-51007753.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let auth: any;
let db: any;
let analytics: any;
const googleProvider = new GoogleAuthProvider();

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    if (firebaseConfig.measurementId) {
        analytics = getAnalytics(app);
    }
} catch (error) {
    console.error("Firebase Initialization Failed:", error);
}

export { auth, googleProvider, signInWithPopup, signOut, db, analytics };

