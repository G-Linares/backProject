import axios from "axios";
import Swal from "sweetalert2";
import React, { ReactElement, useState } from "react";

// me hubiera podido evitar tanto boilerplate code pero no queria utilizar formik
// queria hacerlo manualmente de uno en uno, por eso es tanto codigo

interface FormDataType {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
  type: string;
  alcohol: number;
  region: string;
}
export default function Form(): ReactElement {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [foto, setFoto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [type, setType] = useState("");
  const [alcohol, setAlcohol] = useState(0);
  const [region, setRegion] = useState("");

  const responseBody: FormDataType = {
    nombre: "",
    descripcion: "",
    codigo: "",
    foto: "",
    precio: 0,
    stock: 0,
    type: "",
    alcohol: 0,
    region: ""
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
    responseBody.precio = precio;
    responseBody.stock = stock;
    responseBody.type = type;
    responseBody.alcohol = alcohol;
    responseBody.region = region;
    axios
      .post("http://localhost:8080/api/productos/", responseBody)
      .then((response) => {
        setNombre("");
        setDescripcion("");
        setCodigo("");
        setFoto("");
        setPrecio(0);
        setStock(0);
        setType("");
        setAlcohol(0);
        setRegion("");
        Swal.fire({
          icon: "success",
          title: "Todo Bien!",
          text: "Item agregado correctamente"
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error
        });
      });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-lg mx-auto md:-mt-20 md:mb-14 -mt-10"
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nombre"
            type="text"
            onChange={(e) => inputChangeHandler(setNombre, e)}
            value={nombre}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="type"
          >
            Tipo
          </label>
          <input
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="type"
            type="text"
            value={type}
            onChange={(e) => inputChangeHandler(setType, e)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="region"
          >
            Región
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="region"
            type="text"
            value={region}
            onChange={(e) => inputChangeHandler(setRegion, e)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="alcohol"
          >
            Nivel de Alcohol
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="precio"
          >
            Precio
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="precio"
            type="number"
            placeholder="$"
            value={precio}
            onChange={(e) => inputChangeHandler(setPrecio, e)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="stock"
          >
            Stock
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="stock"
            type="number"
            placeholder="#"
            value={stock}
            onChange={(e) => inputChangeHandler(setStock, e)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="codigo"
          >
            Código
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="codigo"
            type="number"
            placeholder="#"
            value={codigo}
            onChange={(e) => inputChangeHandler(setCodigo, e)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="descripcion"
          >
            URL de Foto
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="descripcion"
            type="text"
            placeholder="Descripción"
            value={foto}
            onChange={(e) => inputChangeHandler(setFoto, e)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mx-auto mt-6 mb-6 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700"
      >
        {" "}
        Agregar Nuevo Mezcal
      </button>
    </form>
  );
}
