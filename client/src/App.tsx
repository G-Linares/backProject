import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";

export const ROUTE_PATHS = {
  Home: "/",
  ProductDetails: "/product-detail/:id"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATHS.Home} element={<ProductGrid />} />
        <Route path={ROUTE_PATHS.ProductDetails} element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
