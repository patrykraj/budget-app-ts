import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { buttonTypes } from "../../static/constants";

import {
  RegularButton,
  InlineButton,
  CrossButton,
  ButtonLoader,
} from "./Button.css";

function Button({ type, children, active, onclick, loading, ...props }) {
  const { regular, inline, cross } = buttonTypes;

  const ButtonContainer = useMemo(() => {
    switch (type) {
      case regular:
        return RegularButton;
      case inline:
        return InlineButton;
      case cross:
        return CrossButton;
      default:
        return RegularButton;
    }
  }, [type]);

  if (props.to)
    return (
      <Link
        {...props}
        onClick={onclick ? () => onclick(props.to.slice(1)) : null}
        style={{ textDecoration: "none" }}
      >
        {type === cross ? (
          <ButtonContainer>&times;</ButtonContainer>
        ) : (
          <ButtonContainer active={active}>{children}</ButtonContainer>
        )}
      </Link>
    );

  return type === cross ? (
    <ButtonContainer onClick={onclick}>&times;</ButtonContainer>
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
  children: null,
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  onclick: PropTypes.func,
  to: PropTypes.string,
  loading: PropTypes.bool,
};
