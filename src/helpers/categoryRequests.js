export const getAllCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    return res.json();
};

export const getProductsByCategory = async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return res.json();
};


