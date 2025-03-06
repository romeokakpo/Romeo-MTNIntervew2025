import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CgArrowLeft, CgMenuRight } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-20 flex items-center justify-between w-full px-3 py-3 bg-blue-100 lg:px-8">
      <div className="inline-flex items-center justify-start gap-x-2">
        <Link to="/">
          <span className="flex items-center">
            <img
              src={logo}
              alt="Logo de l'application"
              className="w-22 h-auto"
            />
            <span className="text-3xl font-bold text-primary">Tasks</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4 cursor-pointer">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/romeokakpo.png" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
