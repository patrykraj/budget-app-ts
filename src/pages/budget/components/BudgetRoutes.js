import React from "react";
import { Routes, Route } from "react-router-dom";

import budgetRoutes from "../../../static/budgetRoutes";

const BudgetRoutes = () => (
  <Routes>
    {budgetRoutes.map((route) => (
      <Route
        key={route.id}
        path={route.path}
        exact={route.exact}
        element={route.element({ content: "Info z modala" })}
      />
    ))}
  </Routes>
);

export default BudgetRoutes;
