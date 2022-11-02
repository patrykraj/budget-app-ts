import styled from "styled-components";

const InputErrorSpan = styled.span`
  color: ${({ theme }) => theme.colors.red.dark};
  font-size: ${({ theme }) => theme.font.sizes.xs};
`;

export default InputErrorSpan;
