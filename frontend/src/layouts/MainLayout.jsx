import Footer from "@/components/customs/footer/Footer";
import Navbar from "@/components/customs/navbar/Navbar";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  //Etat de la sidebar
  useScrollToTop();

  return (
    <div className="w-full min-h-[inherit] flex flex-col">
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col mt-[64px] grow">
        <div className="relative flex grow">
          <div className="relative p-4 pt-6 border-t container mx-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
