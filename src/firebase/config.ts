import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-auth-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-messaging-sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "mock-measurement-id"
};

// Detect if Firebase has valid keys or if we should run a client-side mock emulator
export const isMockFirebase = 
  !import.meta.env.VITE_FIREBASE_API_KEY || 
  import.meta.env.VITE_FIREBASE_API_KEY.includes('mock') ||
  import.meta.env.VITE_FIREBASE_API_KEY === '';

let app;
let auth: any = null;
let db: any = null;

if (!isMockFirebase) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully in production mode.");
  } catch (error) {
    console.error("Failed to initialize production Firebase. Falling back to local emulator/mock mode.", error);
  }
} else {
  console.log("Firebase running in MOCK mode. LocalStorage will simulate Auth and Firestore databases.");
}

export { auth, db };
