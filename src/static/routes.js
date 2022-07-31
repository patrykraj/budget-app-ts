import React from "react";
import Homepage from "../pages/home/Homepage";
import Budget from "../pages/budget/Budget";

const routes = [
  { to: "/", id: "", name: "Home", element: () => <Homepage />, exact: true },
  { to: "/budget", id: "budget", name: "Budget", element: () => <Budget /> },
];

export default routes;
