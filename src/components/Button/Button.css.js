import styled from "styled-components";

const RootButton = styled.button`
  display: block;
  border: none;
  transition: all 0.2s;
`;

export const RegularButton = styled(RootButton)`
  color: ${({ theme }) => theme.font.colors.light};
  background: ${({ theme }) => theme.colors.blue.normal};
  padding: ${({ theme }) => theme.spacing.xxs}px
    ${({ theme }) => theme.spacing.xs}px;
  border-radius: 5px;
  box-shadow: 0;
  font-size: ${({ theme }) => theme.font.sizes.xs};

  && {
    margin-left: ${({ theme }) => theme.spacing.xxs}px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.normal};
    color: ${({ theme }) => theme.font.colors.dark};
  }
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
