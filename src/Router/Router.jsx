import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Menu from "../Pages/Menu/Menu";
import About from "../Pages/About/About";
import Cart from "../Pages/Cart/Cart";
import Order from "../Pages/Order/Order";
import OrderSuccess from "../Pages/Order/OrderSuccess";
import Reservations from "../Pages/Reservations/Reservations";
import AdminLogin from "../Pages/Authentication/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home, 
      },
      {
        path:"/login",
        Component: Login
      },
      {
        path:"/register",
        Component: Register
      },
      {
        path: "/menu",
        Component: Menu
      }, 
{
        path: "/about",
        Component: About,
      },
{
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/order",
        Component: Order,
      },
      {
        path: "/order-success",
        Component: OrderSuccess,
      },
      {
        path: "/reservations",
        Component: Reservations
      },
{
        path: "/admin/login",
        Component: AdminLogin
      },
      {
        path: "/admin/dashboard",
        Component: AdminDashboard
      }
     
    ],
  },
]);
