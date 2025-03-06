import logo from "@/assets/task_background.webp";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const GuestLayout = () => {
  return (
    <div className="flex min-h-[inherit] relative">
      <ToastContainer />
      <div className="relative z-10 flex grow justify-evenly">
        <div className="items-center justify-end hidden sm:flex">
          <img src={logo} alt="Logo" className="" />
        </div>
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default GuestLayout;
