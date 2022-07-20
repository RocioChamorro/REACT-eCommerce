import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEdit, FaTrash, FaExternalLinkSquareAlt } from "react-icons/fa";
// import { BsCartFill } from "react-icons/bs";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { setCurrentProduct, setIsEditProduct } from '../../store/product/productsSlice';
import { startDeletingProduct } from '../../store/product/thunks';


export const ProductCard = ({ data, addToCart, addAnAmount, subtractAnAmount, onOpenModal }) => {
  let { id, title, price, image, description, quantity, category, tempQuantity } = data;

  const dispatch = useDispatch();

  const newTitle = useMemo( () => {
    return title.length > 23 ? title.substring(0,23) + '...' : title;
  }, [title])

  const newDescription = useMemo( () => {
    return description.length > 132 ? description.substring(0,132) + '...' : description;
  }, [description])

  const handleEditProduct = () => {
    dispatch(setIsEditProduct(true));
    dispatch(setCurrentProduct(data));
    onOpenModal();
  }

  const handleSeeMore = () => {
    dispatch(setCurrentProduct(data));
    onOpenModal()
  }

  const handleDeleteProduct = () => {
    dispatch(startDeletingProduct(id));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ objectFit: "contain" }}
        height="200"
        image={image}
        alt="Product"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {newTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="outlined" endIcon={<FaTrash />} size="small" onClick={handleDeleteProduct}>
          Eliminar
        </Button>
        <Button variant="contained" endIcon={<FaEdit />} size="small" onClick={handleEditProduct}>
          Editar
        </Button>
        <Button variant="contained" endIcon={<FaExternalLinkSquareAlt />} size="small" onClick={handleSeeMore}>
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}


// export const ProductCard = () => {
  
//   return (
//     <div className="card text-center mb-4">
//       <div className="card-header">Producto</div>
//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <h4 className="card-text mb-3">$ {price}</h4>
//         <div className="mb-1">
//           <button type="button"
//           className="text-black-50 container-transparent"
//           onClick={() => subtractAnAmount(data)}
//         >
//           <FaMinus />
//         </button>
//           <input
//             type="number"
//             name="qty"
//             value={tempQuantity}
//             min="1"
//             max="100"
//             title="Cantidad"
//             className="container-transparent text-center"
//             readOnly="readonly"
//           />
//           <button type="button"
//           className="text-black-50 container-transparent"
//           onClick={() => addAnAmount(data)}
//         >
//           <FaPlus />
//         </button>
//         </div>
//         <button
//           onClick={() => addToCart(data)}
//           className="btn btn-outline-success"
//         >
//           <span className="text-green me-2">
//             <BsCartFill />
//           </span>
//           Agregar
//         </button>
//       </div>
//     </div>
//   );
// };
