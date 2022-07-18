import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewProduct } from "./productsSlice";


//startGettingProducts: RTK Query

export const startNewProduct = () => {
    return async( dispatch, getState ) => {
        //const { uid } = getState().auth;

        const newProduct = {
            title:'',
            price:'',
            category:'',
            description:'',
            image:''
        }

        const newDoc = doc( collection( FirebaseDB, 'products'));
        await setDoc( newDoc, newProduct );

        newProduct.id = newDoc.id;

        dispatch( addNewProduct ( newProduct ) );

    }
}