import styled from "styled-components";

export const TransactionsWrapper = styled.div`
  padding: 0 1rem;

  table {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xl}px 0;
  }
`;

export const TransactionListElement = styled.tr`
  padding: ${({ theme }) => theme.spacing.xxs}px;
  margin: ${({ theme }) => theme.spacing.xxs}px 0;
  cursor: pointer;
`;
