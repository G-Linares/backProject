import React from "react";
import { IoIosCart } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";
import { cartType } from "../../utils/adminUtils";

import { TApiResponse, useApiGet } from "../../utils/fetchProducts";
import OverallCard from "./OverallCard";
import SmallChartContainer from "./SmallChartContainer";

export default function AllCartsAdmin() {
  const { data: allCartsArray, isLoading: isLoadingCars }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_CARRITO_API_ROUTE}`);
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      {isLoadingCars ? (
        <div className="w-full h-[600px] flex items-center justify-center">
          <RotatingLines
            strokeColor="gray"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <>
          <OverallCard
            primary={"text-yellow-600"}
            secondary={"bg-yellow-100"}
            quantity={allCartsArray.length}
            icon={<IoIosCart className="w-6 h-6" />}
            title={"Carritos Activos"}
            key={"carritos"}
          />
          <OverallCard
            primary={"text-yellow-600"}
            secondary={"bg-yellow-100"}
            quantity={1}
            icon={<IoIosCart className="w-6 h-6" />}
            title={"Carritos en espera"}
            key={"carritos-espera"}
          />
          {allCartsArray.map((item: cartType) => {
            return <SmallChartContainer item={item} key={item._id} />;
          })}
        </>
      )}
    </section>
  );
}
