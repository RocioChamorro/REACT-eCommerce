import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

//inicio de una tarea asícrona
export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        //resultado de registrarse con Google
        const result = await singInWithGoogle();
        if ( !result.default ) return dispatch( logout( result.errorMessage) )
        
        dispatch( login(result) );
    }
}