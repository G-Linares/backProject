import React, { ReactElement, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Props {
  title: string;
  item: any;
  setIsModalOpen: (status: boolean) => void;
}

interface FormDataType {
  _id: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  price: number;
  stock: number;
  type: string;
  alcohol: number;
  region: string;
  sold: number;
  quantity: number;
}

export default function AddItemInCartModal({
  title,
  item,
  setIsModalOpen
}: Props): ReactElement {
  const [_id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [foto, setFoto] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [type, setType] = useState("");
  const [alcohol, setAlcohol] = useState(0);
  const [region, setRegion] = useState("");
  const [sold, setSold] = useState(0);

  const responseBody: FormDataType = {
    _id: "",
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    price: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: "",
    sold: 0,
    quantity: 1
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<any>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.nombre = nombre;
    responseBody.type = type;
    responseBody.descripcion = descripcion;
    responseBody.codigo = codigo;
    responseBody.foto = foto;
    responseBody.price = price;
    responseBody.stock = stock;
    responseBody.type = type;
    responseBody.alcohol = alcohol;
    responseBody.region = region;
    responseBody.sold = sold;
    responseBody._id = _id;
    responseBody.quantity = 1;
    //se hace el llamado al back con la URL que corresponde a addOne, con el nuevo objecto completo y modelado
    //y con los headers para verificar si es admin, ya el servidor validara esta variable y regresara 403 si no es admin
    //y un 200 si es admin y agrega el item

    axios
      .post(
        `${process.env.REACT_APP_CARRITO_API_ROUTE}/${item._id}/productos`,
        responseBody,
        {
          headers: { isadmin: true }
        }
      )
      .then((response) => {
        setId("");
        setNombre("");
        setDescripcion("");
        setCodigo("");
        setFoto("");
        setPrice(0);
        setStock(0);
        setType("");
        setAlcohol(0);
        setRegion("");
        setSold(0);
        Swal.fire({
          icon: "success",
          title: "Todo Bien!",
          text: response.data.message
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.descripcion
        });
      });
  };

  return (
    <div className="h-full w-screen fixed overflow-y-auto overflow-x-hidden top-20 right-0 left-0 z-50 md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg dark:bg-gray-700  border-2 border-grey-200 shadow-2xl">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <form
            onSubmit={onSubmitHandler}
            className="w-full mx-auto pt-10 px-10"
          >
            <h1 className="text-center pb-10 font-bold text-3xl">
              {" "}
              {title}: {item._id}
            </h1>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="input-lable" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  required
                  className="starting-input"
                  id="nombre"
                  type="text"
                  onChange={(e) => inputChangeHandler(setNombre, e)}
                  value={nombre}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="input-lable" htmlFor="type">
                  Tipo
                </label>
                <input
                  required
                  className="input-gray"
                  id="type"
                  type="text"
                  value={type}
                  onChange={(e) => inputChangeHandler(setType, e)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="input-lable" htmlFor="region">
                  Región
                </label>
                <input
                  className="input-gray"
                  id="region"
                  type="text"
                  value={region}
                  onChange={(e) => inputChangeHandler(setRegion, e)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="input-lable" htmlFor="alcohol">
                  Nivel de Alcohol
                </label>
                <input
                  className="input-gray"
                  id="alcohol"
                  type="number"
                  placeholder="Doe"
                  value={alcohol}
                  onChange={(e) => inputChangeHandler(setAlcohol, e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="input-lable" htmlFor="descripcion">
                  Descripción
                </label>
                <input
                  className="starting-input"
                  id="descripcion"
                  type="text"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => inputChangeHandler(setDescripcion, e)}
                />
                <p className="text-gray-600 text-xs italic">
                  Limite de 200 caracteres
                </p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="input-lable" htmlFor="price">
                  Precio
                </label>
                <input
                  className="input-gray"
                  id="price"
                  type="number"
                  placeholder="$"
                  value={price}
                  onChange={(e) => inputChangeHandler(setPrice, e)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="input-lable" htmlFor="stock">
                  Stock
                </label>
                <input
                  className="input-gray"
                  id="stock"
                  type="number"
                  placeholder="#"
                  value={stock}
                  onChange={(e) => inputChangeHandler(setStock, e)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="input-lable" htmlFor="codigo">
                  Código
                </label>
                <input
                  className="input-gray"
                  id="codigo"
                  type="number"
                  placeholder="#"
                  value={codigo}
                  onChange={(e) => inputChangeHandler(setCodigo, e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3">
                <label className="input-lable" htmlFor="descripcion">
                  URL de Foto
                </label>
                <input
                  className="starting-input"
                  id="descripcion"
                  type="text"
                  placeholder="Descripción"
                  value={foto}
                  onChange={(e) => inputChangeHandler(setFoto, e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="input-lable" htmlFor="descripcion">
                  Items Vendidos (Puede ser 0)
                </label>
                <input
                  className="starting-input"
                  id="descripcion"
                  type="text"
                  placeholder="Descripción"
                  value={sold}
                  onChange={(e) => inputChangeHandler(setSold, e)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="input-lable" htmlFor="descripcion">
                  Id de item
                </label>
                <input
                  className="starting-input"
                  id="descripcion"
                  type="text"
                  placeholder="Descripción"
                  value={_id}
                  onChange={(e) => inputChangeHandler(setId, e)}
                />
              </div>
            </div>
            <button type="submit" className="mx-auto mt-6 mb-6 block btn">
              {" "}
              Agregar Nuevo Mezcal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
