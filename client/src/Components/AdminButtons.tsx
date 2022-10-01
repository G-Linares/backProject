import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useGlobalContext } from "../utils/globalContext";
import EditModal from "./EditModal";

//element es toda la informacion del item, su ID, nombre, precio etc
// ahorita tiene tipo any por que solo quiero pasarlo para probar
export interface AdminButtonsType {
  element: any;
}

export default function AdminButtons({
  element
}: AdminButtonsType): ReactElement {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // esto va a redireccionar cuando se cumpla una accion
  let navigate = useNavigate();

  //este es el estado global donde esta almacenado el tipo de usuario
  const { userTypeState } = useGlobalContext();

  //verifica que el usuario sea admin, y regresa true or false al pedido de axios que permite o deniuega el delete
  const IsAdmin = (currentStatus: string) => {
    if (currentStatus === "Admin") {
      return true;
    } else {
      return false;
    }
  };

  // funcion para borrar un item, mandamos el delete con el id del elemento a borrar
  const handleErease = () => {
    try {
      axios
        .delete(`http://localhost:8080/api/productos/${element.id}`, {
          headers: { isadmin: IsAdmin(userTypeState) }
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Item Borrado!",
            text: "Item Borrado satisfactoriamente"
          }).then(() => {
            navigate("/");
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
    setModalIsOpen(true);
    document.body.style.overflow = "hidden";
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
      {/* cuando presionamos Editar, el handleEdit abre un modal para poder mandar
      un request con la nueva info a ingresar al sistema */}
      <EditModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        element={element}
      />
    </div>
  );
}
