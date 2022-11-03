import { Routes, Route } from "react-router-dom";

import budgetRoutes from "../../../static/budgetRoutes";

const BudgetRoutes = () => (
  <Routes>
    {budgetRoutes.map((route) => (
      <Route key={route.id} path={route.path} element={route.element()} />
    ))}
  </Routes>
);

export default BudgetRoutes;
