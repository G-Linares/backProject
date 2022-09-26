import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminButtons(): ReactElement {
  // esto va a redireccionar cuando se cumpla una accion
  let navigate = useNavigate();

  const handleErease = (e: any) => {
    console.log("quieres borrar", e);
    navigate("/");
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
        onClick={(e) => handleErease(e)}
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
