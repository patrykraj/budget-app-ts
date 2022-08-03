import React, { useState } from "react";
import { useSelector } from "react-redux";

import { PageWrapper, Loader } from "../../components";
import { ParentCategory, Transactions } from "./components";
import Grid from "./Budget.css";

function Budget() {
  const { parentCategories, allCategories, isLoading } = useSelector(
    (store) => store.parentCategories
  );
  const { transactions } = useSelector((store) => store.transactions);
  const [activeParentCategoryId, setActiveParentCategory] = useState([]);

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
          activeParentCategoryId.includes(item.id)
        }
        onclick={setActiveParentCategory}
        items={allCategories}
        transactions={transactions.filter(
          (transaction) => transaction.category.parentCategoryId === item.id
        )}
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
              name="Razem"
              active={activeParentCategoryId.length > 1}
              onclick={setActiveParentCategory}
              items={allCategories}
              transactions={transactions}
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
