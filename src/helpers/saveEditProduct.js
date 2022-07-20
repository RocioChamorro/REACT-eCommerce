export const saveEditProduct = async (product, id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  return res.json();
};
