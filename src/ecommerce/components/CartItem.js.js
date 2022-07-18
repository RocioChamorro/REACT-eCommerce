import { BsFillTrashFill } from "react-icons/bs";

export const CartItem = ({ data, removeProductFromCart }) => {
  let { id, name, price, cartQuantity } = data;

  const handleSubtotal = () => {
    return price * cartQuantity;
  };

  return (
    <>
      <td>{name}</td>
      <td className="text-nowrap">$ {price}</td>
      <td>{cartQuantity}</td>
      <td className="text-nowrap">$ {handleSubtotal()}</td>
      <td>
        <button type="button"
          className="fs-5 text-danger container-transparent"
          onClick={() => removeProductFromCart(id)}
        >
          <BsFillTrashFill />
        </button>
      </td>
    </>
  );
};
