import styled from "styled-components";

export const List = styled.ul`
  padding: ${({ theme }) => theme.spacing.xs}px;
  padding-right: 0;

  li {
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.gray.dark};
    padding: ${({ theme }) => theme.spacing.xxs}px;
    padding-right: 0;
  }

  li + li {
    margin: ${({ theme }) => theme.spacing.xxs}px 0;
    margin-right: 0;
  }
`;

export const ParentCategoryElement = styled.li`
  padding: ${({ theme }) => theme.spacing.xxs}px;
  background: ${({ theme }) => theme.colors.gray.light};

  div.parent-category-container {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }
`;
