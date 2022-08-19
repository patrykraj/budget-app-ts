import styled from "styled-components";

export const TransactionsWrapper = styled.div`
  padding: 0 1rem;

  table {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xl}px 0;
  }
`;

export const TransactionsHeader = styled.th`
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: 300;

  &.active {
    font-weight: bold;
  }
`;

export const TransactionListElement = styled.tr`
  padding: ${({ theme }) => theme.spacing.xxs}px;
  margin: ${({ theme }) => theme.spacing.xxs}px 0;
  cursor: pointer;
`;
