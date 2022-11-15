import React, { FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "../../utils/useForm";
import { FormDataType } from "../../utils/adminUtils";

interface Props {
  title: string;
}
export default function AddItemModal({ title }: Props) {
  const initialState: FormDataType = {
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

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
    axios
      .post(`${process.env.REACT_APP_PRODUCT_API_ROUTE}/`, state, {
        headers: { isadmin: true }
      })
      .then((response) => {
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

  const { state, bind } = useForm(initialState);
  const {
    nombre,
    descripcion,
    codigo,
    foto,
    price,
    stock,
    type,
    alcohol,
    region,
    sold
  } = state;

  return (
    <form onSubmit={submitHandler} className="w-1/2 mx-auto pt-10">
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
            name="nombre"
            type="text"
            {...bind}
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
            name="type"
            {...bind}
            value={type}
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
            name="region"
            {...bind}
            value={region}
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
            name="alcohol"
            {...bind}
            value={alcohol}
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
            name="descripcion"
            {...bind}
            value={descripcion}
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
            name="price"
            {...bind}
            value={price}
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
            name="stock"
            {...bind}
            value={stock}
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
            name="codigo"
            {...bind}
            value={codigo}
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
            name="foto"
            {...bind}
            value={foto}
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
            name="sold"
            {...bind}
            value={sold}
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
