import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { PageWrapper } from "../../components";
import { MenuContent, Transactions, BudgetRoutes } from "./components";
import Grid from "./Budget.css";

function Budget() {
  const {
    parentCategories,
    allCategories,
    isCategoriesLoading,
    categoriesErrorMessage,
  } = useSelector((store) => store.parentCategories);
  const { transactions, isTransactionsLoading, transactionsErrorMessage } =
    useSelector((store) => store.transactions);

  const [activeParentCategoryId, setActiveParentCategoryId] = useState([]);

  const isLoading = useMemo(() => {
    return isCategoriesLoading || isTransactionsLoading;
  }, [isCategoriesLoading, isTransactionsLoading]);
  const error = useMemo(() => {
    return categoriesErrorMessage || transactionsErrorMessage;
  }, [categoriesErrorMessage, transactionsErrorMessage]);

  if (error) return <p>{error.message}</p>;

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
              setActiveParentCategoryId={setActiveParentCategoryId}
            />
          </section>
          <section>
            <Transactions
              transactions={transactions}
              activeParentCategoryId={activeParentCategoryId}
            />
          </section>
        </Grid>
      </PageWrapper>
      <BudgetRoutes />
    </>
  );
}

export default Budget;
