import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { PageWrapper, Loader } from "../../components";
import { Transactions } from "./components";
import ParentCategory from "./components/ParentCategory";
import Grid from "./Budget.css";
import { TOTAL } from "../../static/constants";

function Budget() {
  const { parentCategories, allCategories, isCategoriesLoading } = useSelector(
    (store) => store.parentCategories
  );
  const { transactions, isTransactionsLoading } = useSelector(
    (store) => store.transactions
  );
  const [activeParentCategoryId, setActiveParentCategory] = useState([]);

  const isLoading = useMemo(() => {
    return isCategoriesLoading || isTransactionsLoading;
  }, [isCategoriesLoading, isTransactionsLoading]);

  const menuContent = isLoading ? (
    <Loader />
  ) : (
    parentCategories.map((item) => (
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
    ))
  );

  return (
    <PageWrapper>
      <Grid>
        <section>
          <ul>
            <ParentCategory
              id={parentCategories.length + 1}
              name={TOTAL}
              active={activeParentCategoryId.length > 1}
              onclick={setActiveParentCategory}
              items={allCategories}
              showAllElements
              noExtend
            />
            <br />
            {menuContent}
          </ul>
        </section>
        <section>
          <Transactions
            transactions={transactions}
            activeParentCategoryId={activeParentCategoryId}
          />
        </section>
      </Grid>
    </PageWrapper>
  );
}

export default Budget;
