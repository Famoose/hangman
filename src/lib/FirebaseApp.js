// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {
    getFirestore, enableIndexedDbPersistence,
} from 'firebase/firestore'

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

export const enableOfflinePersistence = () => {
    enableIndexedDbPersistence(db)
        .catch((err) => {
            if (err.code === 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code === 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        })
// Subsequent queries will use persistence, if it was enabled successfully
}

export const getUid = () => {
    if (auth.currentUser) {
        return auth.currentUser.uid
    } else {
        throw Error('no current User found')
    }
}