import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import LeftBar from "../LeftBar";

import { useGlobalContext } from "../../utils/globalContext";

export default function AdminLayout(): ReactElement {
  const { user } = useGlobalContext();
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <LeftBar />
      <div className="flex-grow text-gray-800">
        <AdminHeader />
        <h1>Hola! vengo desde global context: {user}</h1>
        <Outlet />
      </div>
    </div>
  );
}
