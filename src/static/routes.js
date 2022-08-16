import React from "react";
import Homepage from "../pages/home/Homepage";
import Budget from "../pages/budget/Budget";

const routes = [
  { to: "/", id: "", name: "Główna", element: () => <Homepage />, exact: true },
  {
    to: "/budget",
    path: "/budget/*",
    id: "budget",
    name: "Budżet",
    element: () => <Budget />,
  },
];

export default routes;
