import styled from "styled-components";

export const TransactionsWrapper = styled.div`
  table {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.xl}px 0;
  }

  .date-picker {
    width: auto;

    input {
      color: ${({ theme }) => theme.colors.gray.light};
      font-size: 0.9rem;
      caret-color: transparent;
      cursor: pointer;
      border: 0;
      text-align: right;
      background: ${({ theme }) => theme.colors.blue.normal};
      padding: ${({ theme }) => theme.spacing.xxs}px;
      max-width: 80px;
      text-align: center;
      border-radius: 5px;
    }
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
  text-align: center;
  padding-bottom: ${({ theme }) => theme.spacing.xs}px;

  &.active {
    font-weight: bold;
  }
`;

export const TransactionListElement = styled.tr`
  padding: ${({ theme }) => theme.spacing.xxs}px;
  margin: ${({ theme }) => theme.spacing.xxs}px 0;
  cursor: pointer;

  td.align-right {
    text-align: right;
  }
`;
