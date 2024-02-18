import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAxjQZmvk4Hor_JGEMpQebl6CNO2r1NPgY',
  authDomain: 'dropbox-clone-60b4c.firebaseapp.com',
  projectId: 'dropbox-clone-60b4c',
  storageBucket: 'dropbox-clone-60b4c.appspot.com',
  messagingSenderId: '195692533536',
  appId: '1:195692533536:web:27234c121ed95cd830a945',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export  { db, storage }