import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Container, Nav } from "./Navigation.css";
import { NavigationWrapper } from "../Wrappers/Wrappers";
import Button from "../Button/Button";
import { buttonTypes } from "../../static/constants";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

function Navigation({ routes, setIsDefaultTheme, isDefaultTheme }) {
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
        <ThemeSwitch
          setIsDefaultTheme={setIsDefaultTheme}
          isDefaultTheme={isDefaultTheme}
        />
      </NavigationWrapper>
    </Container>
  );
}

export default Navigation;

Navigation.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isDefaultTheme: PropTypes.bool.isRequired,
  setIsDefaultTheme: PropTypes.func.isRequired,
};
