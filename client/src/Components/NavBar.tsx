import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agave from "../Assets/images/agave.png";
import CartModal from "./CartModal";

export default function NavBar(): ReactElement {
  const [loggedInfo, setLoggedInfo] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    document.body.style.overflow = "hidden";
    setModalIsOpen(true);
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_ISLOGGED_URL}`,
          {
            withCredentials: true
          }
        );
        setLoggedInfo(response.isAuth);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStatus();
  }, []);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/shop" className="flex items-center">
          <img src={agave} className="w-12 h-12" alt="main logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Agave
          </span>
        </Link>
        {loggedInfo ? (
          <>
            <div className="flex items-center md:order-2">
              <button
                className="btn"
                type="button"
                data-modal-toggle="defaultModal"
                onClick={() => handleOpen()}
              >
                Cart
              </button>
              <button> Log out</button>
            </div>
          </>
        ) : null}
      </div>
      <CartModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </nav>
  );
}
