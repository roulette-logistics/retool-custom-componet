import styled from "styled-components";
import OrderByComponent from "./OrderByComponent";
import SelectField from "./SelectField";
import WhereCondition from "./WhereCondition";
import React, { useEffect } from "react";
import { useState } from "react";

const QueryBuilderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const WhereConditionWrapper = styled.div`
  flex-basis: 45%;
`;

const SelectFieldWrapper = styled.div`
  flex-basis: 20%;
`;

const OptionsSelect = styled.div`
  flex-basis: 35%;
`;

const QueryBuilder = ({ triggerQuery, model, modelUpdate }) => {
  const [whereConditionSubmit, setWhereConditionSubmit] = useState(false);

  const [orderBySubmit, setOrderBySubmit] = useState(false);
  
  useEffect(() => {
    if (model.isBtnClicked == true) {
      setWhereConditionSubmit(true)

      setOrderBySubmit(true);
    }
  }, [model]);

  return (
    <>
      <QueryBuilderWrapper>
        <WhereConditionWrapper>
          <WhereCondition
            triggerQuery={triggerQuery}
            model={model}
            modelUpdate={modelUpdate}
            whereConditionSubmit={whereConditionSubmit}
          />
        </WhereConditionWrapper>

        <SelectFieldWrapper>
          <SelectField
            triggerQuery={triggerQuery}
            model={model}
            modelUpdate={modelUpdate}
          />
        </SelectFieldWrapper>

        <OptionsSelect>
          <OrderByComponent
            triggerQuery={triggerQuery}
            model={model}
            modelUpdate={modelUpdate}
            orderBySubmit={orderBySubmit}
          />
        </OptionsSelect>
        
      </QueryBuilderWrapper>
    </>
  );
};
export default QueryBuilder;
