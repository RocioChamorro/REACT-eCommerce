import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewProduct, startSavingEditProduct } from "../../../../store/product/thunks";

export const ProductModalFooterAdmin = ({ onCloseAndReset, data }) => {
  const { currentProduct, isNewProduct, isEditProduct } = useSelector( state => state.products );
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown")
      onCloseAndReset();
  };

  const handleAddNewProduct = () => {
    // if (title == "" || price == "" || price < 0) return;

    dispatch(startNewProduct(data, onCloseAndReset));
  };

  const handleEditProduct = () => {
    // if (title == "" || price == "" || price < 0) return;

    dispatch(startSavingEditProduct(data, onCloseAndReset));
  };

  return (
    <>
      <Button onClick={handleClose}>
        {isNewProduct || isEditProduct ? "Cancelar" : "Cerrar"}
      </Button>
      {isEditProduct ? (
        <Button onClick={handleEditProduct}>Guardar cambios</Button>
      ) : isNewProduct ? (
        <Button onClick={handleAddNewProduct}>Agregar producto</Button>
      ) : null}
    </>
  );
};
