import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import './index.css'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Cabecera from './components/Cabecera'
import ListProductos from './components/ListProductos';
import ListEntradas from './components/ListEntradas';
import ListSalidas from './components/ListSalidas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListProductos />,
  },
    // {
  //   path: "movimientos",
  //   element: <ListMovimientos />,
  // },
  {
    path: "/entradas",
    element: <ListEntradas />,
  },
  {
    path: "/salidas",
    element: <ListSalidas />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Cabecera />
  <RouterProvider router={router} />
  </>  
);
