import { useDispatch } from "react-redux";
import {
  setCurrentProduct,
  setIsEditProduct,
} from "../../../store/product/productsSlice";
import { startDeletingProduct } from "../../../store/product/thunks";
import { Button } from "@mui/material";
import { FaEdit, FaTrash, FaExternalLinkSquareAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const ProductCardFooterAdmin = ({ data, onOpenModal }) => {
  const dispatch = useDispatch();

  const handleEditProduct = () => {
    dispatch(setIsEditProduct(true));
    dispatch(setCurrentProduct(data));
    onOpenModal();
  };

  const handleSeeMore = () => {
    dispatch(setCurrentProduct(data));
    onOpenModal();
  };

  const handleDeleteProduct = () => {
    Swal.fire({
      title: "Eliminar producto",
      text: `¿Estás seguro de eliminar el producto ${data.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4abdacd9",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingProduct(data.id));
      }
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<FaTrash />}
        size="small"
        onClick={handleDeleteProduct}
      >
        Eliminar
      </Button>
      <Button
        variant="contained"
        endIcon={<FaEdit />}
        size="small"
        onClick={handleEditProduct}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        endIcon={<FaExternalLinkSquareAlt />}
        size="small"
        onClick={handleSeeMore}
      >
        Ver más
      </Button>
    </>
  );
};
