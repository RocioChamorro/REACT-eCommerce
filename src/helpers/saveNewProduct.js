export const saveNewProduct = async (product) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

  return res.json();
};
