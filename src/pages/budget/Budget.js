import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { PageWrapper, Loader } from "../../components";
import { Transactions, InfoElement } from "./components";
import ParentCategory from "./components/ParentCategory";
import Grid from "./Budget.css";
import { budgetPageStrings } from "../../static/constants";
import budgetRoutes from "../../static/budgetRoutes";

function Budget() {
  const {
    parentCategories,
    allCategories,
    isCategoriesLoading,
    categoriesErrorMessage,
  } = useSelector((store) => store.parentCategories);
  const { transactions, isTransactionsLoading, transactionsErrorMessage } =
    useSelector((store) => store.transactions);

  const [activeParentCategoryId, setActiveParentCategory] = useState([]);

  const isLoading = useMemo(() => {
    return isCategoriesLoading || isTransactionsLoading;
  }, [isCategoriesLoading, isTransactionsLoading]);
  const error = useMemo(() => {
    return categoriesErrorMessage || transactionsErrorMessage;
  }, [categoriesErrorMessage, transactionsErrorMessage]);

  const { total, budget, spent } = budgetPageStrings;

  if (error) return <p>{error.message}</p>;

  const menuContent = isLoading ? (
    <Loader />
  ) : (
    <>
      <InfoElement>
        <span />
        <span>{budget}</span>
        <span>{spent}</span>
      </InfoElement>
      <ParentCategory
        id={parentCategories.length + 1}
        name={total}
        active={activeParentCategoryId.length > 1}
        onclick={setActiveParentCategory}
        items={allCategories}
        summary
        noExtend
      />
      <br />
      {parentCategories.map((item) => (
        <ParentCategory
          key={item.id}
          id={item.id}
          name={item.name}
          active={
            activeParentCategoryId.length === 1 &&
            activeParentCategoryId[0] === item.id
          }
          onclick={setActiveParentCategory}
          items={allCategories}
          noExtend={item.noExtend}
        />
      ))}
    </>
  );

  return (
    <>
      <PageWrapper>
        <Grid>
          <section>
            <ul>{menuContent}</ul>
          </section>
          <section>
            <Transactions
              transactions={transactions}
              activeParentCategoryId={activeParentCategoryId}
            />
          </section>
        </Grid>
      </PageWrapper>
      <Routes>
        {budgetRoutes.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            exact={route.exact}
            element={route.element({ content: "Info z modala" })}
          />
        ))}
      </Routes>
    </>
  );
}

export default Budget;
