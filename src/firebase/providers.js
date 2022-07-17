import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
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
        return {
            default: false,
            errorMessage: error.message
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        console.log(resp.user)

        //actualiza el displaName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            default: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        return { default: false, errorMessage: error.message};
    }
}

export const loginWithEmailAndPassword = async( { email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { displayName, uid, photoURL } = resp.user;

        return {
            default: true,
            displayName,
            email,
            photoURL,
            uid
        }

    } catch (error) {
        return { default: false, errorMessage: error.message};
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}