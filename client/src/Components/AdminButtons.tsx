import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export interface AdminButtonsType {
  idOfElement: number;
}

export default function AdminButtons({
  idOfElement
}: AdminButtonsType): ReactElement {
  // esto va a redireccionar cuando se cumpla una accion
  let navigate = useNavigate();

  const handleErease = () => {
    try {
      axios
        .delete(`http://localhost:8080/api/productos/${idOfElement}`)
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
