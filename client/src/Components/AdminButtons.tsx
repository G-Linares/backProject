import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalContext } from "../utils/globalContext";

export interface AdminButtonsType {
  idOfElement: number;
}

export default function AdminButtons({
  idOfElement
}: AdminButtonsType): ReactElement {
  // esto va a redireccionar cuando se cumpla una accion
  let navigate = useNavigate();

  //este es el estado global donde esta almacenado el tipo de usuario
  const { copy } = useGlobalContext();

  //verifica que el usuario sea admin, y regresa true or false al pedido de axios que permite o deniuega el delete
  const IsAdmin = (currentStatus: string) => {
    if (currentStatus === "Admin") {
      return true;
    } else {
      return false;
    }
  };

  // funcion para borrar un item
  const handleErease = () => {
    try {
      axios
        .delete(`http://localhost:8080/api/productos/${idOfElement}`, {
          headers: { isadmin: IsAdmin(copy) }
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Item Borrado!",
            text: "Item Borrado satisfactoriamente"
          }).then(() => {
            window.location.reload();
          });
        });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "No se pudo borrar",
        text: error
      });
    }
  };

  // funcion para editar un producto
  const handleEdit = (e: any) => {
    console.log("quieres editar", e);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-around">
      {" "}
      <button
        className="bg-red-400  text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded mt-4"
        onClick={(e) => handleErease()}
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
  );
}
