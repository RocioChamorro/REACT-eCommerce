import { Navigate, Route, Routes } from 'react-router-dom'
import { Cart } from '../pages/Cart'
import { Ecommerce } from '../pages/Ecommerce'
import { NewProduct } from '../pages/NewProduct'

export const EcommerceRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Ecommerce/>} />
        <Route path="cart" element={ <Cart/>} />
        <Route path="newproduct" element={<NewProduct/>} />

        <Route path="/*" element={ <Navigate to="/" />} />
    </Routes>
  )
}
