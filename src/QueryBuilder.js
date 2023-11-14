import React from "react";
import WhereCondition from "./WhereCondition";
import SelectField from "./SelectField";
import styled from "styled-components";

const QueryBuilderWrapper = styled.div`
display:flex;
justify-content:flex-start;
` 

const WhereConditionWrapper = styled.div`
flex-basis:45%;
`

const SelectFieldWrapper = styled.div`
flex-basis:25%;
`

const OptionsSelect = styled.div`
flex-basis:30%;
background-color:red;
`

const QueryBuilder = ({ triggerQuery, model, modelUpdate }) => {
  return (
    <>
    <QueryBuilderWrapper>

    <WhereConditionWrapper>
      <WhereCondition
        triggerQuery={triggerQuery}
        model={model}
        modelUpdate={modelUpdate}
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

      </OptionsSelect>
      </QueryBuilderWrapper>
    </>
  );
};
export default QueryBuilder;
