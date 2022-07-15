
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid} = result.user;
        return {
            default: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            default: false,
            errorMessage
        }
    }
}