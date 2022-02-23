// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDcLvINiXMUf8x4r1OjQeUmD3zyN_SbRi0',
    authDomain: 'hangman-b0371.firebaseapp.com',
    projectId: 'hangman-b0371',
    storageBucket: 'hangman-b0371.appspot.com',
    messagingSenderId: '92366757058',
    appId: '1:92366757058:web:80dca478a15832a2892f5b',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
