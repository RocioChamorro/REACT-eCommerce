// import { FaMinus, FaPlus } from "react-icons/fa";
// import { BsCartFill } from "react-icons/bs";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ProductCard = ({ data, addToCart, addAnAmount, subtractAnAmount }) => {
  let { title, price, image, description, quantity, category, tempQuantity } = data;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{objectFit:'contain'}}
        height="200"
        image={image}
        alt="Product"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
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
