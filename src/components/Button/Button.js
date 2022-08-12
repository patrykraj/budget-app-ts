import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { buttonTypes } from "../../static/constants";

import { RegularButton, InlineButton } from "./Button.css";

function Button({ type, children, active, setActiveLink, ...props }) {
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

  const content = <ButtonContainer active={active}>{children}</ButtonContainer>;

  return props.to ? (
    <Link
      {...props}
      onClick={setActiveLink ? () => setActiveLink(props.to.slice(1)) : null}
      style={{ textDecoration: "none" }}
    >
      {content}
    </Link>
  ) : (
    content
  );
}

export default Button;

Button.defaultProps = {
  to: "",
  active: null,
  setActiveLink: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  setActiveLink: PropTypes.func,
  to: PropTypes.string,
};
