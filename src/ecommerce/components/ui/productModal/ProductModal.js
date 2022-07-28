import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardMedia,
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
  Typography,
} from "@mui/material";
import { FaPlus, FaImage } from "react-icons/fa";
import { ProductModalFooterAdmin } from "./ProductModalFooterAdmin";
import { ProductModalFooterUser } from "./ProductModalFooterUser";
import { useForm } from "../../../../hooks/useForm";
import { resetCurrentProduct } from "../../../../store/product/productsSlice";

// const categories = [ "Electrónica", "Joyería", "Ropa de hombre", "Ropa de mujer" ];
const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export const ProductModal = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useSelector((state) => state.auth);
  const { currentProduct, isNewProduct, isEditProduct } = useSelector(
    (state) => state.products
  );
  const {
    formState,
    title,
    description,
    price,
    category,
    image,
    onInputChange,
    onResetForm,
  } = useForm(currentProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const onCloseAndReset = () => {
    onClose();
    onResetForm();
    setTimeout(() => {
      dispatch(resetCurrentProduct());
    }, 500);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown")
      onCloseAndReset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">Producto</DialogTitle>
      <DialogContent dividers={true}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            {isEditProduct || isNewProduct ? (
              <Box noValidate component="form">
                <TextField
                  margin="dense"
                  id="title"
                  label="Nombre"
                  name="title"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={title}
                  onChange={onInputChange}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Descripción"
                  name="description"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={description}
                  onChange={onInputChange}
                />
                <TextField
                  margin="dense"
                  id="price"
                  label="Precio ($)"
                  name="price"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={price}
                  onChange={onInputChange}
                />
                <FormControl sx={{ mt: 2, minWidth: 250 }}>
                  <InputLabel htmlFor="select-category">Categoría</InputLabel>
                  <Select
                    label="Categoría"
                    value={category}
                    onChange={onInputChange}
                    inputProps={{
                      name: "category",
                      id: "category",
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
            ) : (
              <Box>
                <Typography variant="h6" gutterBottom component="div">
                  {title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  $ {price}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  Categoría: {category}
                </Typography>
              </Box>
            )}
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
              {isNewProduct ? "Carga la imagen del producto" : ""}
            </DialogContentText>
            {isNewProduct ? (
              <FaImage size={200} color="grey" />
            ) : (
              <img width="160" src={image} alt={title} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isAdmin ? (
          <ProductModalFooterAdmin
            onCloseAndReset={onCloseAndReset}
            data={formState}
          />
        ) : (
          <ProductModalFooterUser
            onCloseAndReset={onCloseAndReset}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};
