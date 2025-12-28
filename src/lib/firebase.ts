import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Helper to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize Firebase (only in browser)
let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

if (isBrowser) {
  if (!firebaseConfig.apiKey) {
    console.warn(
      'Firebase config missing. Please set NEXT_PUBLIC_FIREBASE_* environment variables.'
    );
  } else {
    try {
      // Initialize Firebase app (only once)
      if (!getApps().length) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        firebaseApp = getApps()[0];
      }

      firebaseAuth = getAuth(firebaseApp);
      firebaseDb = getFirestore(firebaseApp);
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
    }
  }
}

// Helper function to get db with runtime error
function getDb(): Firestore {
  if (!firebaseDb) {
    throw new Error(
      'Firebase is not initialized. Make sure you are running this code in the browser and that all NEXT_PUBLIC_FIREBASE_* environment variables are set.'
    );
  }
  return firebaseDb;
}

// Helper function to get auth with runtime error
function getAuthInstance(): Auth {
  if (!firebaseAuth) {
    throw new Error(
      'Firebase Auth is not initialized. Make sure you are running this code in the browser and that all NEXT_PUBLIC_FIREBASE_* environment variables are set.'
    );
  }
  return firebaseAuth;
}

// Export getters that throw errors if not initialized (type-safe)
export const db = new Proxy({} as Firestore, {
  get(target, prop) {
    return getDb()[prop as keyof Firestore];
  },
});

export const auth = new Proxy({} as Auth, {
  get(target, prop) {
    return getAuthInstance()[prop as keyof Auth];
  },
});

// Export app directly (can be null during SSR)
export const app = firebaseApp;

// Export the raw instances for advanced use cases
export { firebaseApp, firebaseAuth, firebaseDb };

export default firebaseApp;
