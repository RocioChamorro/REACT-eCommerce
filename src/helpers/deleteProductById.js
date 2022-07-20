export const deleteProductById = async(id) => {
  const res = await fetch(`https://fakestoreapi.com/products/6${id}`, {
    method: "DELETE",
  })

  return res.json();
};
