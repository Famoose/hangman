// Custom hook to read  auth record and user profile doc
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from './FirebaseApp'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

export function useUserData() {
    console.log(useAuthState)
    const [user] = useAuthState(auth)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        // turn off realtime subscription
        let unsubscribe
        console.log(user)
        if (user) {
            const ref = doc(db, 'users', user.uid)
            unsubscribe = onSnapshot(ref, (doc) => {
                setProfile(() => ({
                    username: doc.data()?.username,
                }))
            })
        } else {
            setProfile(null)
        }
        return unsubscribe
    }, [user])

    return { user, profile }
}
