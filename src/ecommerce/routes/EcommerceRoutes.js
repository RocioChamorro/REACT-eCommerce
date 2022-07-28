import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFound } from '../components/ui/NotFound'
import { Cart } from '../pages/Cart'
import { Ecommerce } from '../pages/Ecommerce'

export const EcommerceRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Ecommerce/>} />
        <Route path="cart" element={ <Cart/>} />
        <Route path="/not-found" element={<NotFound />}></Route>
        {/* <Route path="/*" element={ <Navigate to="/" />} /> */}
    </Routes>
  )
}
