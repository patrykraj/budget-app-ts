import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { buttonTypes } from "../../static/constants";

import { RegularButton, InlineButton, ButtonLoader } from "./Button.css";

function Button({ type, children, active, onclick, loading, ...props }) {
  const { regular, inline } = buttonTypes;

  const ButtonContainer = useMemo(() => {
    switch (type) {
      case regular:
        return RegularButton;
      case inline:
        return InlineButton;
      default:
        return RegularButton;
    }
  }, [type]);

  return props.to ? (
    <Link
      {...props}
      onClick={onclick ? () => onclick(props.to.slice(1)) : null}
      style={{ textDecoration: "none" }}
    >
      <ButtonContainer active={active}>{children}</ButtonContainer>
    </Link>
  ) : (
    <ButtonContainer onClick={onclick} disabled={loading}>
      {loading ? <ButtonLoader /> : children}
    </ButtonContainer>
  );
}

export default Button;

Button.defaultProps = {
  to: "",
  active: null,
  onclick: () => {},
  loading: false,
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onclick: PropTypes.func,
  to: PropTypes.string,
  loading: PropTypes.bool,
};
