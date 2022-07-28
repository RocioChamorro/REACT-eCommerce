import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductCardFooterAdmin } from "./ProductCardFooterAdmin";
import { ProductCardFooterUser } from "./ProductCardFooterUser";
import { setCurrentProduct } from "../../../store/product/productsSlice";

export const ProductCard = ({ data, onOpenModal }) => {
  let { title, price, image, description } = data;

  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 20 ? title.substring(0, 20) + "..." : title;
  }, [title]);

  const newDescription = useMemo(() => {
    return description.length > 75
      ? description.substring(0, 75) + "..."
      : description;
  }, [description]);

  const handleOpenModal = () => {
    dispatch(setCurrentProduct(data));
    onOpenModal();
  };

  return (
    <Card sx={{ maxWidth: 345, height: 400, py: 1 }}>
      <CardMedia onClick={handleOpenModal}
        component="img"
        sx={{ objectFit: "contain" }}
        height="175"
        image={image}
        alt="Product"
      />
      <CardContent sx={{ height: 120 }}>
        <Typography gutterBottom variant="h5" component="div">
          {newTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {newDescription}
        </Typography>
      </CardContent>
      <Typography gutterBottom variant="h5" component="div" align="center">
        $ {price}
      </Typography>
      <CardActions sx={{ justifyContent: "center" }}>
        {isAdmin ? (
          <ProductCardFooterAdmin data={data} onOpenModal={onOpenModal} />
        ) : (
          <ProductCardFooterUser data={data} />
        )}
      </CardActions>
    </Card>
  );
};
