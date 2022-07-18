// import useForm from "../../src/hooks/useForm";
// import productImg from "../../src/assets/products.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// import { addNewProduct } from "../features/productsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useForm } from "../../hooks";
import { addNewProduct } from "../../store/product/productsSlice";

export const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialForm = {
    name: "",
    price: 0,
    quantity: 0,
  };

  const { name, price, quantity, handleInputChange} = useForm(initialForm);

  const handleAddNewProduct = () => {
    if ( name == "" || price == "" || price < 0 || quantity == "" || quantity < 1 ) return;

    const payload = {
      id: nanoid(),
      name,
      price,
      quantity,
      tempQuantity: 1,
    };

    dispatch(addNewProduct(payload));

    toast.success("Nuevo producto agregado", { position: "bottom-right" });
    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-md-6 col-12">
        {/* <img src={productImg} className="productsImage" alt="productos" /> */}
      </div>
      <div className="col-md-6 col-12">
        <div className="container mt-5">
          <h1 className="shoppingCard-title">Nuevo producto</h1>
          <hr />
          <form onSubmit={handleAddNewProduct}>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Nombre del producto</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="form-control"
                    id="name"
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    id="price"
                    onChange={handleInputChange}
                    aria-describedby="priceHelp"
                  />
                  <div id="priceHelp" className="form-text">
                    Precio del producto más IGV
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Cantidad disponible</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    id="quantity"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            {name == "" || price < 0 || quantity < 1 ? (
              <div className="alert alert-danger" role="alert">
                Ingresa todos los campos
              </div>
            ) : (
              ""
            )}
            <div className="d-grid gap-2 col-6 mx-auto text-center">
              <button type="submit" className="btn btn-success">
                Agregar nuevo producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
