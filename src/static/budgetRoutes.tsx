import React from "react";
import { Modal } from "../components";

import Form from "../components/Modal/Form";
import Confirm from "../components/Modal/Confirm";

const budgetRoutes = [
  {
    id: "transaction/new",
    path: "/transaction/new",
    exact: true,
    element: () => (
      <Modal>
        <Form />
      </Modal>
    ),
  },
  {
    id: "transaction/delete/:id",
    path: "/transaction/delete/:id",
    exact: true,
    element: () => (
      <Modal>
        <Confirm />
      </Modal>
    ),
  },
  {
    id: "transaction/:id",
    path: "/transaction/:id",
    exact: true,
    element: () => (
      <Modal>
        <Form isTransactionUpdate />
      </Modal>
    ),
  },
];

export default budgetRoutes;
