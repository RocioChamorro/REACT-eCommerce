import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaShoppingCart, FaCartPlus, FaCcVisa } from "react-icons/fa";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  clearCart,
  removeProductFromCart,
  totalCartSum,
} from "../../store/cart/cartSlice";

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(item) {
  const num = item.cartQuantity * item.price;
  return `${num.toFixed(2)}`;
}

export const Cart = () => {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(totalCartSum());
  }, [cartItems]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeProductFromCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <Container maxWidth="lg">
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Stack direction="row" spacing={2}>
                      <Box component="span" color="primary.main">
                        <FaShoppingCart size={25} />
                      </Box>
                      <Typography variant="h5" gutterBottom component="div">
                        Carrito de compras
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Unidad</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ display: "flex", flexDirection: "row" }}>
                      <img src={item.image} alt={item.title} width="100" />
                      <Box sx={{ ml: 3 }}>
                        <h3>{item.title}</h3>
                        <Typography variant="body2" gutterBottom>
                          {item.category}
                        </Typography>
                        <Button
                          size="small"
                          sx={{ color: "#DFDCE3" }}
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Eliminar
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{item.cartQuantity}</TableCell>
                    <TableCell align="right">$ {item.price}</TableCell>
                    <TableCell align="right">$ {priceRow(item)}</TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell />
                  <TableCell colSpan={2} align="right">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>$ {ccyFormat(cartTotalAmount)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item sm={8} xs={12}>
              <Button variant="outlined" onClick={handleClearCart}>
                Limpiar carrito
              </Button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Stack direction="column" spacing={2}>
                <Button variant="contained" endIcon={<FaCcVisa />}>
                  Ir a pagar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/")}
                  startIcon={<FaCartPlus />}
                >
                  Seguir comprando
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Box
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: 5,
          }}
        >
          <Box component="span" color="primary.main">
            <FaShoppingCart size={75} />
          </Box>
          <Alert variant="outlined" severity="warning">
            Tu carrito de compras se encuentra vacío —{" "}
            <Link component={RouterLink} variant="body2" to="/">
              {"Empieza a comprar"}
            </Link>
          </Alert>
        </Box>
      )}
    </>
  );
};
