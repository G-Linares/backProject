import React, { ReactElement } from "react";
import {
  FiPackage,
  FiArchive,
  FiShoppingCart,
  FiTrendingUp,
  FiUser,
  FiUserPlus
} from "react-icons/fi";
import BigChartContainer from "../Components/AdminComponents/BigChartContainer";
import OverallCard from "../Components/AdminComponents/OverallCard";
import ScrollDownList from "../Components/AdminComponents/ScrollDownList";
import SmallChartContainer from "../Components/AdminComponents/SmallChartContainer";

export default function Dashboard(): ReactElement {
  const overallSquares = [
    {
      icon: <FiPackage className="h-6 w-6" />,
      title: "Items Únicos",
      quantity: 5,
      primary: "text-blue-600",
      secondary: "bg-blue-100"
    },
    {
      icon: <FiArchive className="h-6 w-6" />,
      title: "Items en Stock",
      quantity: 400,
      primary: "text-green-600",
      secondary: "bg-green-100"
    },
    {
      icon: <FiShoppingCart className="h-6 w-6" />,
      title: "Carritos (activos)",
      quantity: 10,
      primary: "text-purple-600",
      secondary: "bg-purple-100"
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "Vendidos Este año",
      quantity: 480,
      primary: "text-cyan-600",
      secondary: "bg-cyan-100"
    }
  ];
  return (
    <>
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Agave Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">
              {" "}
              Herramienta de administrador
            </h2>
          </div>
        </div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {overallSquares.map((item) => {
            return (
              <OverallCard
                primary={item.primary}
                secondary={item.secondary}
                quantity={item.quantity}
                icon={item.icon}
                title={item.title}
                key={item.title}
              />
            );
          })}
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <BigChartContainer />
          <OverallCard
            primary={"text-yellow-600"}
            secondary={"bg-yellow-100"}
            quantity={250}
            icon={<FiUser className="w-6 h-6" />}
            title={"Usuarios"}
            key={"usuarios"}
          />
          <OverallCard
            primary={"text-yellow-600"}
            secondary={"bg-yellow-100"}
            quantity={1}
            icon={<FiUserPlus className="w-6 h-6" />}
            title={"Admins"}
            key={"admins"}
          />

          <SmallChartContainer />
          <ScrollDownList />
        </section>
      </main>
    </>
  );
}
