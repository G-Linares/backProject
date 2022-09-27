import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductGrid from "./Views/ProductGrid";
import ProductDetails from "./Views/ProductDetails";
import useLocalStorage from "./utils/LocalStorage";
import NavBar from "./Components/NavBar";
import { MyGlobalContext } from "./utils/globalContext";

// ---- de aqui manejo las rutas para poder interactuar con las dinamicas y tener mas limio el codigo ---
export const ROUTE_PATHS = {
  Home: "/",
  ProductDetails: "/product-detail/:id"
};
export const navigateToRoute = {
  goToProductDetails: (id: string) =>
    `${ROUTE_PATHS.ProductDetails}`.replace(":id", id)
};

const App = () => {
  // inicializo el local Storage dependiendo el global state que declare antes con el contexto
  const [userType, setUserType] = useLocalStorage("userType", "customer");
  //inicializo el estado global para que pueda acceder en todo momento a la variable de tipo de usuario
  const [copy, setCopy] = useState<string>(userType);

  return (
    <MyGlobalContext.Provider value={{ copy, setCopy }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path={ROUTE_PATHS.Home}
            element={
              <ProductGrid userType={userType} setUserType={setUserType} />
            }
          />
          <Route
            path={ROUTE_PATHS.ProductDetails}
            element={<ProductDetails />}
          />
        </Routes>
      </BrowserRouter>
    </MyGlobalContext.Provider>
  );
};

export default App;
