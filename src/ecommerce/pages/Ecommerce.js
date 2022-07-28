import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { EcommerceLayout } from "../layout/EcommerceLayout";
import { addAnAmount, setIsNewProduct, subtractAnAmount } from "../../store/product/productsSlice";
import { addToCard } from "../../store/cart/cartSlice";
import { ProductCard } from "../components/productCard/ProductCard";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { ProductModal } from "../components/ui/productModal/ProductModal";

export const Ecommerce = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

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
      {isAdmin ? (
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
      ) : null}
    </EcommerceLayout>
  );
};
