import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  position: relative;

  section:nth-child(1) {
    flex: 4;
  }

  section:nth-child(2) {
    flex: 8;
  }

  section + section {
    margin-left: ${({ theme }) => theme.spacing.xl}px;
  }
`;

export default Grid;
