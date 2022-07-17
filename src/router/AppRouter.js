import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { EcommerceRoutes } from "../ecommerce/routes/EcommerceRoutes";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  // if (status === "checking") {
  //   //Próxima implementación de una vista de loading
  //   return <CheckingAuth />;
  // }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<EcommerceRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
