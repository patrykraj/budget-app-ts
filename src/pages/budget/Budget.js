import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { PageWrapper, ErrorHandler } from "../../components";
import { MenuContent, Transactions, BudgetRoutes } from "./components";
import Grid from "./Budget.css";

function Budget() {
  const {
    parentCategories,
    allCategories,
    isCategoriesLoading,
    categoriesErrorMessage,
    activeParentCategoryId,
  } = useSelector((store) => store.parentCategories);
  const { transactions, isTransactionsLoading, transactionsErrorMessage } =
    useSelector((store) => store.transactions);

  const isLoading = useMemo(() => {
    return isCategoriesLoading || isTransactionsLoading;
  }, [isCategoriesLoading, isTransactionsLoading]);
  const error = useMemo(() => {
    return categoriesErrorMessage || transactionsErrorMessage;
  }, [categoriesErrorMessage, transactionsErrorMessage]);

  if (error)
    return (
      <PageWrapper>
        <ErrorHandler>{error}</ErrorHandler>
      </PageWrapper>
    );

  return (
    <>
      <PageWrapper>
        <Grid>
          <section>
            <MenuContent
              activeParentCategoryId={activeParentCategoryId}
              allCategories={allCategories}
              isLoading={isLoading}
              parentCategories={parentCategories}
            />
          </section>
          <section>
            <Transactions
              transactions={transactions}
              activeParentCategoryId={activeParentCategoryId}
            />
          </section>
          <div id="root-portal" />
        </Grid>
      </PageWrapper>
      <BudgetRoutes />
    </>
  );
}

export default Budget;
