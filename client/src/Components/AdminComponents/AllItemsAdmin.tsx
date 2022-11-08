import React, { ReactElement } from "react";
import { RotatingLines } from "react-loader-spinner";
import { TApiResponse, useApiGet } from "../../utils/fetchProducts";
import AdminItemList from "./AdminItemList";

export default function AllItemsAdmin(): ReactElement {
  const { data: allItemsArray, isLoading: isLoadingItems }: TApiResponse =
    useApiGet(`${process.env.REACT_APP_PRODUCT_API_ROUTE}`);
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 p-5">
      {isLoadingItems ? (
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
        <AdminItemList
          allItemsArray={allItemsArray}
          isLoading={isLoadingItems}
        />
      )}
    </section>
  );
}
