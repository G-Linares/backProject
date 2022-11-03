import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";

// components used in the layout
import AdminHeader from "../AdminComponents/AdminHeader";
import LeftBar from "../AdminComponents/LeftBar";

// context to bring the info
import { useGlobalContext } from "../../utils/globalContext";

export default function AdminLayout({ children }: any): ReactElement {
  const { userName } = useGlobalContext();
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <LeftBar />
      <div className="flex-grow text-gray-800">
        <AdminHeader />
        <h1>Hola! vengo desde global context: {userName}</h1>
        <Outlet />
      </div>
    </div>
  );
}
