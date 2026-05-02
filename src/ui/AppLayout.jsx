import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";
import SideNav from "./SideNav";

function AppLayout() {
  return (
    <div className="lg:max-w-360 lg:mx-auto lg:grid lg:grid-cols-[auto_1fr] ">
      <div className="hidden lg:block lg:w-51.75 xl:w-55.25 2xl:w-75">
        <SideNav />
      </div>

      <div className="pt-6 md:pt-8  px-4 md:px-10 pb-13 md:pb-18.5 lg:pb-8 relative min-h-screen flex flex-col">
        <main className="pb-6 md:pb-8 lg:pb-0 flex-1 flex flex-col">
          <Outlet />
        </main>

        <MobileNav />
      </div>
    </div>
  );
}

export default AppLayout;
