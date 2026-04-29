import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="pt-6 md:pt-8  px-4 md:px-10 pb-13 md:pb-18.5 relative min-h-screen  flex flex-col">
      <main className="pb-6 md:pb-8 flex-1 flex flex-col">
        <Outlet />
      </main>

      <MobileNav />
    </div>
  );
}

export default AppLayout;
