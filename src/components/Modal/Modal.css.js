import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.bg.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 300px;
  height: 250px;
  background: ${({ theme }) => theme.colors.white.light};
`;
