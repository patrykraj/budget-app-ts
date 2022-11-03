import React from "react";
import PropTypes from "prop-types";

import { InfoElement, ParentCategory } from "./index";
import { Loader } from "../../../../components";
import { budgetPageStrings } from "../../../../static/constants";

const MenuContent = ({
  activeParentCategoryId,
  allCategories,
  isLoading,
  parentCategories,
}) => {
  if (isLoading) return <Loader />;

  const { total } = budgetPageStrings;

  return (
    <ul>
      <InfoElement />
      <ParentCategory
        id={parentCategories.length + 1}
        name={total}
        active={activeParentCategoryId.length > 1}
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
          items={allCategories}
          noExtend={item.noExtend}
        />
      ))}
    </ul>
  );
};

export default MenuContent;

MenuContent.defaultProps = {
  activeParentCategoryId: [],
  allCategories: [],
  parentCategories: [],
};

MenuContent.propTypes = {
  activeParentCategoryId: PropTypes.arrayOf(PropTypes.number),
  allCategories: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool.isRequired,
  parentCategories: PropTypes.arrayOf(PropTypes.shape({})),
};
