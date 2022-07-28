import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { addToCard } from "../../../store/cart/cartSlice";
import { Box, Button } from "@mui/material";

export const ProductCardFooterUser = ({ data }) => {

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCard({ data, tempQuantity: count }));
    navigate("/cart");
  };

  const handleAddAnAmount = () => {
    setCount(count + 1);
  };

  const handleSubtractAnAmount = () => {
    setCount(Math.max(count - 1, 1));
  };
  return (
    <>
      <div className="product-qty">
        <Button
          onClick={handleSubtractAnAmount}
        >
          <FaMinus />
        </Button>
        <input
          type="number"
          name="qty"
          value={count}
          min="1"
          max="100"
          title="Cantidad"
          className="container-transparent text-center"
          readOnly="readonly"
        />
        <Button
          onClick={handleAddAnAmount}
        >
          <FaPlus />
        </Button>
      </div>
      <Button variant="contained" startIcon={<BsCartFill />} sx={{borderRadius: "0 5px 5px 0"}} onClick={handleAddToCart}>Agregar</Button>
    </>
  );
};
