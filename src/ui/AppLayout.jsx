import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";

function AppLayout() {
  return (
    <div className="pt-6 px-4 pb-13 relative min-h-screen  flex flex-col">
      <main className="pb-6 flex-1 flex flex-col">
        <Outlet />
      </main>

      <MobileNav />
    </div>
  );
}

export default AppLayout;
