import styled, { keyframes } from "styled-components";

const RootButton = styled.button`
  display: block;
  border: none;
  transition: all 0.2s;
`;

export const RegularButton = styled(RootButton)`
  color: ${({ theme }) => theme.font.colors.light};
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray.dark : theme.colors.blue.normal};
  padding: ${({ theme }) => theme.spacing.xxs}px
    ${({ theme }) => theme.spacing.xs}px;
  border-radius: 5px;
  box-shadow: 0;
  font-size: ${({ theme }) => theme.font.sizes.xs};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  ${({ disabled }) =>
    disabled &&
    `
      height: 30px;
    `}

  && {
    margin-left: ${({ theme }) => theme.spacing.xxs}px;
  }

  ${({ theme, disabled }) =>
    !disabled &&
    `
    display: flex;
    height: 30px;
      &:hover {
        color: ${theme.font.colors.dark};
        background-color: ${theme.colors.gray.normal};
      }
    `}
`;

export const InlineButton = styled(RootButton)`
  color: ${({ theme, active }) =>
    active ? theme.font.colors.blue : theme.font.colors.dark};
  background: transparent;
  text-decoration: none;
  cursor: pointer;

  ::after {
    transition: all ease-in-out 0.2s;
    content: "";
    background-color: ${({ theme }) => theme.font.colors.blue};
    display: block;
    margin: 0 auto;
    height: 2px;
    width: ${({ active }) => (active ? "100%" : 0)};
  }
`;

const rotate = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const ButtonLoader = styled.div`
  font-size: 10px;
  margin: 2px auto;
  text-indent: -9999em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: ${rotate} 1.4s infinite linear;
  animation: ${rotate} 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
&::before {
  width: 50%;
  height: 50%;
  background: #ffffff;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
&::after {
  background: ${({ theme }) => theme.colors.gray.dark};
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
`;
