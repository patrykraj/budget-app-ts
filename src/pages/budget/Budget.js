import React, { useState } from "react";
import { useSelector } from "react-redux";

import { PageWrapper, Loader } from "../../components";
import ParentCategory from "./components";
import Grid from "./Budget.css";
import formatCurrency from "../../utils/formatCurrency";

function Budget() {
  const { parentCategories, allCategories, isLoading } = useSelector(
    (store) => store.parentCategories
  );
  const { transactions } = useSelector((store) => store.transactions);
  const [activeParentCategoryId, setActiveParentCategory] = useState(null);

  const content = isLoading ? (
    <Loader />
  ) : (
    parentCategories.map((item) => (
      <ParentCategory
        key={item.id}
        id={item.id}
        name={item.name}
        active={item.id === activeParentCategoryId}
        setActive={setActiveParentCategory}
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
          <ul>{content}</ul>
        </section>
        <section>
          <ul>
            {transactions.length &&
              transactions.map(
                (item) =>
                  activeParentCategoryId === item.category.parentCategoryId && (
                    <li key={item.id}>
                      {`${item.description}, Cena: ${formatCurrency(
                        item.amount
                      )}`}
                    </li>
                  )
              )}
          </ul>
        </section>
      </Grid>
    </PageWrapper>
  );
}

export default Budget;
