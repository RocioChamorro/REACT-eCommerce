import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
//import { addToCard, clearCart, removeProductFromCart, totalCartSum } from "../features/cartSlice";
//import { addAnAmount, subtractAnAmount, updateProductAvailability } from "../features/productsSlice";
import { EcommerceLayout } from "../layout/EcommerceLayout";
import {
  addAnAmount,
  subtractAnAmount,
} from "../../store/product/productsSlice";
import { addToCard } from "../../store/cart/cartSlice";
import { ProductCard } from "../components/ProductCard";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { startNewProduct } from "../../store/product/thunks";
import { useNavigate } from "react-router-dom";

const categories = [
  "Electrónica",
  "Joyería",
  "Ropa de hombre",
  "Ropa de mujer",
];

export const Ecommerce = () => {
  const [open, setOpen] = useState(false);
  const { products, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { cartItems, cartTotalAmount } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      setOpen(false);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <EcommerceLayout>
      {products.map((product) => (
        <Grid item xs={12} md={4} key={product.id}>
          <ProductCard
            key={product.id}
            data={product}
            addToCart={handleAddToCart}
            addAnAmount={handleAddAnAmount}
            subtractAnAmount={handleSubtractAnAmount}
          />
        </Grid>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">Nuevo producto</DialogTitle>
        <DialogContent dividers={true}>
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <Box noValidate component="form">
                <TextField
                  margin="dense"
                  id="name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="Description"
                  label="Descripción"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  margin="dense"
                  id="price"
                  label="Precio"
                  type="number"
                  fullWidth
                  variant="standard"
                />
                <FormControl sx={{ mt: 2, minWidth: 250 }}>
                  <InputLabel htmlFor="select-category">Categoría</InputLabel>
                  <Select
                    label="Categoría"
                    value={category}
                    onChange={handleCategoryChange}
                    inputProps={{
                      name: "select-category",
                      id: "select-category",
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DialogContentText>
                Carga la imagen del producto
              </DialogContentText>
              <FaImage size={200} color="grey" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Agregar producto</Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Nuevo producto">
        <IconButton
          onClick={handleClickOpen}
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
};
