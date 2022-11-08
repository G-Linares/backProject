import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

type Props = {
  title: string;
};

interface FormDataType {
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
}

export default function AddItemModal({ title }: Props) {
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
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    price: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: "",
    sold: 0
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
    //se hace el llamado al back con la URL que corresponde a addOne, con el nuevo objecto completo y modelado
    //y con los headers para verificar si es admin, ya el servidor validara esta variable y regresara 403 si no es admin
    //y un 200 si es admin y agrega el item
    axios
      .post(`${process.env.REACT_APP_PRODUCT_API_ROUTE}/`, responseBody, {
        headers: { isadmin: true }
      })
      .then((response) => {
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
    <form onSubmit={onSubmitHandler} className="w-1/2 mx-auto pt-10">
      <h1 className="text-center pb-10 font-bold text-3xl"> {title}</h1>
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
      <button type="submit" className="mx-auto mt-6 mb-6 block btn">
        {" "}
        Agregar Nuevo Mezcal
      </button>
    </form>
  );
}
