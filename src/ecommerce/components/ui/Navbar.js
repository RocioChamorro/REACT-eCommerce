import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, InputBase, Link, Paper, Tab, Tabs } from "@mui/material";
import { startLogout } from "../../../store/auth/thunks";
import { startSetProductByCategory } from "../../../store/product/thunks";
import App from "../../../algolia/App";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import { useCheckAuth } from "../../../hooks";
import user from "../../../assets/user.jpg";

const pages = [""];
const settings = ["Mi perfil", "Mis pedidos", "Cerrar sesión"];
//const searchClient = algoliasearch('S0ZM5LSE19', '08a7fdbe34b03a844600cf26665b56f0');

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { displayName, photoURL } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const { status } = useCheckAuth();

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [currentCategoryTab, setCurrentCategoryTab] = useState("products");

  const handleChange = (event, newCategory) => {
    setCurrentCategoryTab(newCategory);
    dispatch(startSetProductByCategory(newCategory));
  };

  const handleOpenCart = () => {
    navigate("/cart");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    if (status === "authenticated") {
      setAnchorElUser(event.currentTarget);
    } else {
      navigate("/auth/login");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    switch (setting) {
      case "Cerrar sesión":
        dispatch(startLogout());
        break;

      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ShoppingCart!
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { sm: "flex", xs: "none" },
                justifyContent: "center",
              }}
            >
              <App />
              <div id="productSearch"></div>
            </Box>

            <Box sx={{ flexGrow: 1 }} textAlign="center">
              <IconButton aria-label="cart" onClick={handleOpenCart}>
                <StyledBadge badgeContent={cartTotalQuantity} color="secondary">
                  <Box component="span" sx={{ color: "primary.contrastText" }}>
                    <FaShoppingCart size={25} />
                  </Box>
                </StyledBadge>
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ my: 2, mr: 1, display: "inline" }}>{ status === "authenticated" ? displayName : <Button size="small" sx={{color:"primary.contrastText"}} onClick={()=>navigate("/auth/login")}>Inicia sesión</Button>}</Box>
              <Tooltip title={status === "authenticated" ? "Abrir configuraciones" : "Iniciar sesión"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  { status === "authenticated" ? <Avatar alt="foto" src={photoURL}/> : <Avatar alt="foto" src={user} /> }
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Tabs onChange={handleChange} centered value={currentCategoryTab}>
        <Tab label="Products" value="products" />
        {categories.map((category, index) => (
          <Tab key={index} label={category} value={category} />
        ))}
      </Tabs>
    </>
  );
};
