import React, { ReactElement } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { navigateToRoute } from "../App";
import Hero from "../Components/Hero";

// custom hook that catches all the dfetched data loading state of the fetch
import { useApiGet, TApiResponse } from "../utils/fetchProducts";

interface Props {
  userType: string;
  setUserType: (type: string) => void;
}

export default function ProductGrid({
  userType,
  setUserType
}: Props): ReactElement {
  //custom hook for the fetch, as parameter the URL will be required, this is to render all products
  const { data, isLoading }: TApiResponse = useApiGet(
    "http://localhost:8080/api/productos"
  );

  const handleErease = (e: any) => {
    console.log("quieres borrar");
  };

  const handleEdit = (e: any) => {
    console.log("quieres editar", e);
  };

  return (
    <div className="bg-white">
      <Hero userType={userType} setUserType={setUserType} />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            <div className="w-screen h-[500px] flex items-center justify-center">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <>
              {data.map((item: any) => {
                return (
                  <div className="group" key={item.id}>
                    <Link to={navigateToRoute.goToProductDetails(item.id)}>
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                          src={item.foto}
                          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                          className=" max-h-[420px] h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <h3 className="mt-1 text-lg font-medium text-gray-900">
                        {item.nombre}
                      </h3>
                      <p className="mt-1 text-sm text-gray-700">
                        Agave tipo: {item.type}
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        Region: {item.region}
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        ${item.precio}.00 MXN
                      </p>
                      <p className="mt-1 text-sm text-gray-700">
                        {item.descripcion}
                      </p>
                    </Link>
                    {userType === "Admin" && (
                      <div className="flex items-center justify-around">
                        {" "}
                        <button
                          className="bg-red-400  text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded mt-4"
                          onClick={(e) => handleErease(e)}
                        >
                          Borrar
                        </button>
                        <button
                          className="bg-gray-200  text-gray-600 font-bold py-2 px-4 border-b-4 border-gray-400 rounded mt-4"
                          onClick={(e) => handleEdit(e)}
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
