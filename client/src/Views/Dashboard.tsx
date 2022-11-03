import React, { ReactElement } from "react";
import {
  FiPackage,
  FiArchive,
  FiShoppingCart,
  FiTrendingUp,
  FiUser,
  FiUserPlus
} from "react-icons/fi";
import OverallCard from "../Components/OverallCard";

export default function Dashboard(): ReactElement {
  const overallSquares = [
    {
      icon: <FiPackage className="h-6 w-6" />,
      title: "Items Únicos",
      quantity: 5,
      color: "blue"
    },
    {
      icon: <FiArchive className="h-6 w-6" />,
      title: "Items en Stock",
      quantity: 400,
      color: "green"
    },
    {
      icon: <FiShoppingCart className="h-6 w-6" />,
      title: "Carritos (activos)",
      quantity: 10,
      color: "purple"
    },
    {
      icon: <FiTrendingUp className="h-6 w-6" />,
      title: "Vendidos Este año",
      quantity: 480,
      color: "cyan"
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
                color={item.color}
                quantity={item.quantity}
                icon={item.icon}
                title={item.title}
                key={item.title}
              />
            );
          })}
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">
              Grafica de ventas anuales
            </div>
            <div className="p-4 flex-grow">
              <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                Chart
              </div>
            </div>
          </div>
          <OverallCard
            color={"yellow"}
            quantity={250}
            icon={<FiUser className="w-6 h-6" />}
            title={"Usuarios"}
            key={"usuarios"}
          />
          <OverallCard
            color={"yellow"}
            quantity={1}
            icon={<FiUserPlus className="w-6 h-6" />}
            title={"Admins"}
            key={"admins"}
          />

          <div className="row-span-3 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
              <span>Items Únicos Listados</span>
              <button
                type="button"
                className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Descending
                <svg
                  className="-mr-1 ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
              <ul className="p-6 space-y-6">
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/82.jpg"
                      alt="Annette Watson profile "
                    />
                  </div>
                  <span className="text-gray-600">Annette Watson</span>
                  <span className="ml-auto font-semibold">9.3</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/81.jpg"
                      alt="Calvin Steward profile "
                    />
                  </div>
                  <span className="text-gray-600">Calvin Steward</span>
                  <span className="ml-auto font-semibold">8.9</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/80.jpg"
                      alt="Ralph Richards profile "
                    />
                  </div>
                  <span className="text-gray-600">Ralph Richards</span>
                  <span className="ml-auto font-semibold">8.7</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/79.jpg"
                      alt="Bernard Murphy profile "
                    />
                  </div>
                  <span className="text-gray-600">Bernard Murphy</span>
                  <span className="ml-auto font-semibold">8.2</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/78.jpg"
                      alt="Arlene Robertson profile "
                    />
                  </div>
                  <span className="text-gray-600">Arlene Robertson</span>
                  <span className="ml-auto font-semibold">8.2</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/77.jpg"
                      alt="Jane Lane profile "
                    />
                  </div>
                  <span className="text-gray-600">Jane Lane</span>
                  <span className="ml-auto font-semibold">8.1</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/76.jpg"
                      alt="Pat Mckinney profile "
                    />
                  </div>
                  <span className="text-gray-600">Pat Mckinney</span>
                  <span className="ml-auto font-semibold">7.9</span>
                </li>
                <li className="flex items-center">
                  <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="Norman Walters profile "
                    />
                  </div>
                  <span className="text-gray-600">Norman Walters</span>
                  <span className="ml-auto font-semibold">7.7</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
            <div className="px-6 py-5 font-semibold border-b border-gray-100">
              Students by type of studying
            </div>
            <div className="p-4 flex-grow">
              <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                Chart
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
