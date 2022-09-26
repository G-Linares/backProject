import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";
import useLocalStorage from "./utils/LocalStorage";

export const ROUTE_PATHS = {
  Home: "/",
  ProductDetails: "/product-detail/:id"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

const App = () => {
  const [userType, setUserType] = useLocalStorage("userType", "customer");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTE_PATHS.Home}
          element={
            <ProductGrid userType={userType} setUserType={setUserType} />
          }
        />
        <Route
          path={ROUTE_PATHS.ProductDetails}
          element={<ProductDetails userType={userType} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
