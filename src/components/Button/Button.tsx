import { useMemo } from "react";
import { Link } from "react-router-dom";

import { buttonTypes } from "../../static/constants";
import { ButtonProps } from "./ButtonTypes";

import {
  RegularButton,
  InlineButton,
  CrossButton,
  ButtonLoader,
} from "./Button.css";

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  active,
  onclick,
  loading,
  ...props
}) => {
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

  if (props.to) {
    const transformedLink = props.to.slice(1);

    return (
      <Link
        to={transformedLink}
        onClick={
          onclick
            ? (e: React.MouseEvent<HTMLElement>) => {
                e.stopPropagation();
                onclick(transformedLink);
              }
            : undefined
        }
        style={{ textDecoration: "none" }}
      >
        {type === cross ? (
          <ButtonContainer>&times;</ButtonContainer>
        ) : (
          <ButtonContainer active={active}>{children}</ButtonContainer>
        )}
      </Link>
    );
  }

  return type === cross ? (
    <ButtonContainer onClick={onclick}>&times;</ButtonContainer>
  ) : (
    <ButtonContainer onClick={onclick} disabled={loading}>
      {loading ? <ButtonLoader /> : children}
    </ButtonContainer>
  );
};

export default Button;
