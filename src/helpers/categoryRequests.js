export const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return res.json();
};