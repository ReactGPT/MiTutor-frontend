import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import React from "react";
import Header from "../components/ui/Header";
import { DASHBOARD_SIDEBAR_LINKS } from "../data/navigation";
import { Outlet } from "react-router-dom";
import { useParameters } from "../store/hooks";
import { useRouter } from "../context";

function Layout() {
  const { fetchEspecialidades, fetchFacultades } = useParameters();
  const { sideBarOption } = useRouter();
  useEffect(() => {
    fetchEspecialidades();
    fetchFacultades();

  }, []);

  return (
    <div className="flex flex-row bg-gradient-to-br from-white to-blue-300 h-screen w-screen min-w-[1080px] min-h-[720px]">
      <div className="h-full w-[20%] min-w-[255px] max-w-[300px]">
        <Sidebar sidebarLinks={sideBarOption} />
      </div>
      <div className="w-full h-full p-5 flex flex-col gap-5">
        <div className="w-full flex h-[6.5%] min-h-[60px] z-10">
          <Header />
        </div>
        <div className="w-full flex-1 bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md overflow-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;