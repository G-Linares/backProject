import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import agave from "../Assets/images/agave.png";

export default function NavBar(): ReactElement {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img src={agave} className="w-12 h-12" alt="main logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Agave
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <button
            className="btn"
            type="button"
            data-modal-toggle="defaultModal"
          >
            Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
