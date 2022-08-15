import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Container, Nav } from "./Navigation.css";
import { NavigationWrapper } from "../Wrappers/Wrappers";
import Button from "../Button/Button";
import { buttonTypes } from "../../static/constants";

function Navigation({ routes, RightElement }) {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname.split("/")[1]);
  const { inline } = buttonTypes;

  return (
    <Container>
      <NavigationWrapper>
        <Nav>
          {routes.map((route) => (
            <Button
              type={inline}
              to={route.to}
              key={route.to}
              onclick={setActiveLink}
              active={route.id === activeLink}
            >
              {route.name}
            </Button>
          ))}
        </Nav>
        {RightElement}
      </NavigationWrapper>
    </Container>
  );
}

export default Navigation;

Navigation.defaultProps = {
  RightElement: null,
};

Navigation.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  RightElement: PropTypes.node,
};
