import React from "react";
import { Modal } from "../components";

const budgetRoutes = [
  {
    id: "transaction/new",
    path: "/transaction/new",
    exact: true,
    element: ({ content }) => <Modal>{content}</Modal>,
  },
  {
    id: "transaction/:id",
    path: "/transaction/:id",
    exact: true,
    element: ({ content }) => <Modal>{content}</Modal>,
  },
];

export default budgetRoutes;
