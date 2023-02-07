import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Cabecera from './components/Cabecera'
import ListProductos from './routes/ListProductos';
import ListEntradas from './routes/ListEntradas';
import ListSalidas from './routes/ListSalidas';

const AppLayout = () => (
  <>
  <Cabecera />
  <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ListProductos />,
      },
      {
        path: "entradas",
        element: <ListEntradas />,
      },
      {
        path: "salidas",
        element: <ListSalidas />,
      },
    ],
  }, 
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
