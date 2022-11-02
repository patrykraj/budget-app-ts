import styled from "styled-components";

const ThemeButton = styled.button`
  width: 30px;
  height: 20px;
  border: 0;
  background: ${({ theme }) => theme.colors.gray.dark};
  border-radius: 20px;
  cursor: pointer;
  position: relative;

  &::before {
    display: block;
    position: absolute;
    content: "";
    top: 1px;
    left: 0;
    background: ${({ theme }) => theme.switch.day};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all 0.2s;
  }

  &.active {
    &::before {
      left: 30px;
      transform: translate(-100%, 0);
    }
  }
`;

export default ThemeButton;
