import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import AllProducts from "@/components/pages/public/AllProducts";
import ContactUs from "@/components/pages/public/ContactUs";
import Login from "@/components/pages/public/Login";
import Register from "@/components/pages/public/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
]);

const Route = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Route;
