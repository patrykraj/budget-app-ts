import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
    display: block;
    width: 50px;
    height: 50px;
    position: relative;
    border: 5px solid;
    border-color: #F4B400 transparent #DB4437 transparent;
    border-radius: 50%;
    animation: ${rotate} 2s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        content: '';
        position: absolute;
        display: block;
        width: 38px;
        height: 38px;
        position: relative;
        border: 5px solid;
        border-color: transparent #4285F4 transparent #0F9D58;
        border-radius: 50%;
        animation: ${rotate} 1s linear infinite;
        animation-direction: reverse;
    }
`;

export default Loader;