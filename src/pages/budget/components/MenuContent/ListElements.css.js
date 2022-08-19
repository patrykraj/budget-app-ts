import styled from "styled-components";

export const List = styled.ul`
  padding: ${({ theme }) => theme.spacing.xs}px;
  padding-right: 0;

  li {
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.gray.dark};
    padding: ${({ theme }) => theme.spacing.xxs}px;
    padding-right: 5px;

    span {
      flex: 1 1 0;

      &.data-field {
        text-align: right;

        &.exceed {
          color: ${({ theme }) => theme.colors.red.dark};
        }
      }
    }
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

    span {
      flex: 1 1 0;

      &.data-field {
        text-align: right;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &.spent {
          color: ${({ theme, exceed }) =>
            exceed ? theme.colors.red.dark : "inherit"};
        }
      }
    }
  }
`;

export const InfoElementWrapper = styled.li`
  display: flex;
  background: ${({ theme }) => theme.colors.gray.light};

  span {
    display: inline-block;
    flex: 1 1 0;
    background: transparent;
    text-align: center;
  }
`;
