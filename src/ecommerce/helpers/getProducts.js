import { PRODUCTS } from "../data/products";

export const getProducts = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(PRODUCTS);
        }, 2000);
    });
}