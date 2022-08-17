import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { ModalWrapper, ModalContainer } from "./Modal.css";
import Button from "../Button";
import { navigationStrings, buttonTypes } from "../../static/constants";

function Modal({ children }) {
  const { budget } = navigationStrings;
  const { cross } = buttonTypes;
  const navigate = useNavigate();
  const navigateBack = useCallback(() => navigate(budget), [children]);

  return createPortal(
    <ModalWrapper onClick={navigateBack}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Button type={cross} onclick={navigateBack} />
        {children}
      </ModalContainer>
    </ModalWrapper>,
    document.querySelector("#modal")
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
