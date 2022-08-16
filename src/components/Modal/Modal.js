import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { ModalWrapper, ModalContainer } from "./Modal.css";

function Modal({ children }) {
  const navigate = useNavigate();
  const navigateBack = useCallback(() => navigate("/budget"), [children]);

  return createPortal(
    <ModalWrapper onClick={navigateBack}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <button type="submit" onClick={navigateBack}>
          &times;
        </button>
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
