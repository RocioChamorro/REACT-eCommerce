import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CSpinner } from '@coreui/react';
import { addToCard, clearCart, removeProductFromCart, totalCartSum } from "../features/cartSlice";
import { addAnAmount, subtractAnAmount, updateProductAvailability } from "../features/productsSlice";
import { CartItem } from "./CartItem.js";
import { ProductCard } from "./ProductCard";
import logo from "../assets/logo.png";
import { BsCartFill } from "react-icons/bs";

export const ShoppingCartScreen = () => {
  const { products, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { cartItems, cartTotalAmount } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalCartSum());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCard(product));
  };

  const handleAddAnAmount = (product) => {
    dispatch(addAnAmount(product));
  };

  const handleSubtractAnAmount = (product) => {
    dispatch(subtractAnAmount(product));
  };

  const handleRemoveProductFromCart = (id) => {
    dispatch(removeProductFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePurchase = () => {
    dispatch(updateProductAvailability(cartItems));
    handleClearCart();
    toast.success("Compra exitosa", { position: "bottom-right" });
  };

  return (
    <div>
      {status === "pending" ? (
        <div className="text-center p-5"><CSpinner color="success"/></div>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                  <ProductCard
                    key={product.id}
                    data={product}
                    addToCart={handleAddToCart}
                    addAnAmount={handleAddAnAmount}
                    subtractAnAmount={handleSubtractAnAmount}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border border-success">
              <div className="card-body">
                <div className="d-flex justify-content-center mb-2">
                  <img src={logo} alt="Logo" />
                  <h2 className="shoppingCard-title mb-0">
                    Carrito de compras
                  </h2>
                </div>
                {cartItems.length === 0 ? (
                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>
                      Su carrito de compras está vacío. Agregue productos.
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Nombre</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <CartItem
                              key={index}
                              data={item}
                              removeProductFromCart={
                                handleRemoveProductFromCart
                              }
                            />
                          </tr>
                        ))}
                        <tr>
                          <th colSpan="3" className="text-end">
                            TOTAL
                          </th>
                          <th className="text-nowrap">$ {cartTotalAmount}</th>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <button
                              type="button"
                              className="btn btn-outline-success"
                              onClick={() => handleClearCart()}
                            >
                              Limpiar
                            </button>
                          </td>
                          <td colSpan="3" className="text-end">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => handlePurchase()}
                            >
                              <span className="fs-5 text-white me-2">
                                <BsCartFill />
                              </span>
                              Comprar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
