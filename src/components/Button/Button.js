import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {buttonTypes} from "../../static/constants";

import {RegularButton, InlineButton} from './Button.css';

function Button({type, children, active, setActiveLink, ...props}) {
    const {regular, inline} = buttonTypes;
    
    const ButtonContainer = useMemo(() => {
        switch(type) {
            case regular:
                return RegularButton;
            case inline:
                return InlineButton;
            default:
                return RegularButton;
    }}, [type]);

    const content = <ButtonContainer active={active}>{children}</ButtonContainer>;

    return props.to ?
        (<Link {...props} onClick={() => setActiveLink(props.to.slice(1))} style={{textDecoration: 'none'}}>
            {content}
        </Link>)
        : content;
};

export default Button;

Button.propTypes = {
    type: PropTypes.string.isRequired,
};
