export const deleteProductById = async(id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })

  return res.json();
};
