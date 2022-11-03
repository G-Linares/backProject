import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
//todas las vistas para la aplicacion ---
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";
import NotFound from "./Views/NotFound";
import Dashboard from "./Views/Dashboard";
//---
//layout para la todas las paginas ---
import RegCustomerLayout from "./Components/Layouts/RegCustomerLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";
///------

// import useLocalStorage from "./utils/LocalStorage";
import { MyGlobalContext } from "./utils/globalContext";
import Login from "./Views/Login";

// ---- de aqui manejo las rutas para poder interactuar con las dinamicas y tener mas limio el codigo ---
export const ROUTE_PATHS = {
  Login: "/",
  ProductDetails: "/product-detail/:id",
  Dashboard: "/dsh",
  Shop: "/shop"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

// ----------

const App = () => {
  // el username va a estar en global context
  const [userName, setUserName] = useState<any>();

  // routing para cliente normal
  const clientRouting = [
    { path: ROUTE_PATHS.Login, element: <Login setUser={setUserName} /> },
    {
      path: ROUTE_PATHS.Shop,
      element: <ProductGrid />
    },
    { path: ROUTE_PATHS.ProductDetails, element: <ProductDetails /> }
  ];

  // routing para dashboard de admin
  const adminRouting = [
    { path: ROUTE_PATHS.Dashboard, element: <Dashboard /> }
  ];

  return (
    <MyGlobalContext.Provider value={{ userName, setUserName }}>
      {/* agrego third party library para el carrito, me dio flojera implementarlo yo, quizas despues lo haga */}
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTE_PATHS.Login} element={<RegCustomerLayout />}>
              {clientRouting.map((item) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}
            </Route>
            <Route path={ROUTE_PATHS.Dashboard} element={<AdminLayout />}>
              {adminRouting.map((item) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MyGlobalContext.Provider>
  );
};

export default App;
