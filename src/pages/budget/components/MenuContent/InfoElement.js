import React from "react";

import { InfoElementWrapper } from "./index";
import { budgetPageStrings } from "../../../../static/constants";

const InfoElement = () => {
  const { budget, spent } = budgetPageStrings;

  return (
    <InfoElementWrapper>
      <span />
      <span>{budget}</span>
      <span>{spent}</span>
    </InfoElementWrapper>
  );
};

export default InfoElement;
