import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { FaPlus, FaImage } from "react-icons/fa";

const categories = [
  "Electrónica",
  "Joyería",
  "Ropa de hombre",
  "Ropa de mujer",
];

export const ProductModal = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
      setOpen(false);
      onClose();
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
            <DialogContentText>Carga la imagen del producto</DialogContentText>
            <FaImage size={200} color="grey" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Agregar producto</Button>
      </DialogActions>
    </Dialog>
  );
};
