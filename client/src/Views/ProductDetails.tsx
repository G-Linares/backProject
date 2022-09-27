import React from "react";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

// como este hook puede utilizarse para hacer un get, solo modifico el URL y jalo solo un item
import { useApiGet, TApiResponse } from "../utils/fetchProducts";
import AdminButtons from "../Components/AdminButtons";

type Props = {
  userType: string;
};

export default function ProductDetails({ userType }: Props) {
  const { id } = useParams<any>();
  const { data, isLoading }: TApiResponse = useApiGet(
    `http://localhost:8080/api/productos/${id}`
  );

  return (
    <>
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
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={data.foto}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {data.region}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data.nombre}
                </h1>

                <p className="leading-relaxed">{data.descripcion}</p>
                <div className="pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${data.precio}.00 MXN
                  </span>
                  <button className="flex ml-auto btn">Comprar</button>
                </div>
                {userType === "Admin" && (
                  <div className="mt-4">
                    <AdminButtons idOfElement={data.id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
