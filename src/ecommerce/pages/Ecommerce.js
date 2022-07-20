import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
//import { addToCard, clearCart, removeProductFromCart, totalCartSum } from "../features/cartSlice";
//import { addAnAmount, subtractAnAmount, updateProductAvailability } from "../features/productsSlice";
import { EcommerceLayout } from "../layout/EcommerceLayout";
import {
  addAnAmount,
  setIsNewProduct,
  subtractAnAmount,
} from "../../store/product/productsSlice";
import { addToCard } from "../../store/cart/cartSlice";
import { ProductCard } from "../components/ProductCard";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { startNewProduct } from "../../store/product/thunks";
import { useNavigate } from "react-router-dom";
import { ProductModal } from "../components/ui/ProductModal";



export const Ecommerce = () => {
  const { products } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { cartItems, cartTotalAmount } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleNewProduct = () => {
    navigate("/newproduct");
    // dispatch( startNewProduct() );
  };

  const handleAddToCart = (product) => {
    dispatch(addToCard(product));
  };

  const handleAddAnAmount = (product) => {
    dispatch(addAnAmount(product));
  };

  const handleSubtractAnAmount = (product) => {
    dispatch(subtractAnAmount(product));
  };

  //#region MODAL
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenModalNewProduct = () => {
    dispatch(setIsNewProduct(true));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //#endregion

  return (
    <EcommerceLayout>
      {products.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <ProductCard
            key={product.id}
            data={product}
            onOpenModal={handleClickOpenModal}
            addToCart={handleAddToCart}
            addAnAmount={handleAddAnAmount}
            subtractAnAmount={handleSubtractAnAmount}
          />
        </Grid>
      ))}
      <ProductModal isOpen={openModal} onClose={handleCloseModal} />
      <Tooltip title="Nuevo producto">
        <IconButton
          onClick={handleOpenModalNewProduct}
          size="large"
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            ":hover": { backgroundColor: "primary.main", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <FaPlus />
        </IconButton>
      </Tooltip>
    </EcommerceLayout>
  );
};;
