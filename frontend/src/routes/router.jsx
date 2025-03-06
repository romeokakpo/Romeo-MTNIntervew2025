import GuestLayout from "@/layouts/GuestLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { createBrowserRouter } from "react-router-dom";
import { authLoader, mainLoader } from "./authLoader";
import Dashboard from "@/pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/auth",
    loader: authLoader,
    element: <GuestLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    loader: mainLoader,
    element: <MainLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);

export default router;
