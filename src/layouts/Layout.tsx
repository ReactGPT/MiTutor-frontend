import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/ui/Header"
import { DASHBOARD_SIDEBAR_LINKS } from "../data/navigation";
import { Outlet } from "react-router-dom";

function Layout() {

  const [headerTitle, setHeaderTitle] = useState<string>('');
  useEffect(() => {
    setHeaderTitle('Inicio')
  }, []);

  return (
    <div className="flex flex-row bg-gradient-to-br from-white to-blue-300 h-screen w-screen min-w-[1080px] min-h-[720px]">
      <div className="h-full w-[20%] min-w-[255px] max-w-[300px]">
        <Sidebar setTitle={setHeaderTitle} sidebarLinks={DASHBOARD_SIDEBAR_LINKS} />
      </div>
      <div className="w-full h-full p-5 flex flex-col gap-5">
        <div className="w-full flex h-[6.5%] min-h-[60px]">
          <Header title={headerTitle} />
        </div>
        <div className="w-full h-full flex">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout