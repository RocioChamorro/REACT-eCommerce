import { Route, Routes } from 'react-router-dom'
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { EcommerceRoutes } from "../ecommerce/routes/EcommerceRoutes"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/auth/*" element={ <AuthRoutes /> } />
        <Route path="/*" element={ <EcommerceRoutes /> } />
    </Routes>
  )
}
