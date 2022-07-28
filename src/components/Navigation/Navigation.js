import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import PropTypes from 'prop-types';

import {Container, Nav} from './Navigation.css.js';
import { NavigationWrapper } from "../Wrappers/Wrappers.js";
import Button from "../Button/Button.js";
import {buttonTypes} from "../../static/constants.js";

const Navigation = ({routes, RightElement, ...props}) => {
    const {pathname} = useLocation();
    const [activeLink, setActiveLink] = useState(pathname.split('/')[1]);
    const {inline} = buttonTypes;

    return <Container>
        <NavigationWrapper>
            <Nav>
                {routes.map((route) => 
                    <Button 
                        type={inline}
                        to={route.to} 
                        key={route.to}
                        setActiveLink={setActiveLink}
                        active={route.id === activeLink}
                        >
                            {route.name}
                    </Button>
                )}
            </Nav>
            {RightElement}
        </NavigationWrapper>
    </Container>
};

export default Navigation;

Navigation.propTypes = {
    routes: PropTypes.array.isRequired,
    RightElement: PropTypes.node,
};
