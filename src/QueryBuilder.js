import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  QueryBuilderWrapper,
  WhereConditionWrapper,
} from "./Components/StyledComponents";
import { OperatorData, whereConditionOperator } from "./QueryBuilderConstant";
import WhereCondition from "./WhereCondition";

// const SelectFieldWrapper = styled.div`
//   flex-basis: 20%;
// `;

// const OptionsSelect = styled.div`
//   flex-basis: 35%;
// `;
const QueryBuilder = ({ triggerQuery, model, modelUpdate }) => {
  const fieldOptionData = model?.columnsData?.map((data) => {
    return {
      value: data.name,
      label: data.name,
      dataType: data.dataType,
      disabled: !data.isSupported, // if it is not supported then disable it
    };
  });

  const whereConditionDefaultArrayValue = {
    operatorArrayData: [],
    column: "",
    operator: OperatorData[0],
    value: "",
    fromValue: "", // this is only for between operator for date and date time
    toValue: "", // this is only for between operator for date and date time
    betweenValue: whereConditionOperator[0],
    dataType: "",
  };

  //{ register, control, handleSubmit, watch, setValue, reset }

  const whereConditionUseFormData = useForm({
    defaultValues: {
      filterDropDownData: [whereConditionDefaultArrayValue],
    },
  });

  //{ fields, append, remove }
  const whereConditionUseFieldArray = useFieldArray({
    control: whereConditionUseFormData.control,
    name: "filterDropDownData",
  });

  const orderByDefaultArrayValue = {
    columnValue: "",
    orderValue: "",
  };

  // { register, control, handleSubmit, watch, setValue, reset }
  const orderByUseFormData = useForm({
    defaultValues: {
      orderByData: [orderByDefaultArrayValue],
    },
  });

  // { fields, append, remove }
  const orderByUseFieldArray = useFieldArray({
    control: orderByUseFormData.control,
    name: "orderByData",
  });

  useEffect(() => {
    if (model.isBtnClicked == true) {
      onSubmit();
    }
  }, [model]);

  const onSubmit = () => {
    const whereFormData = whereConditionUseFormData.watch();
    const orderByFormData = orderByUseFormData.watch();

    const queryBuilderOutputData = { ...whereFormData, ...orderByFormData };

    modelUpdate({
      isBtnClicked: false,
      outputData: queryBuilderOutputData,
    });

    triggerQuery("get_query_payload");
  };

  return (
    <>
      {model && (
        <QueryBuilderWrapper>
          <WhereConditionWrapper>
            <WhereCondition
              triggerQuery={triggerQuery}
              model={model}
              modelUpdate={modelUpdate}
              fieldOptionData={fieldOptionData}
              whereConditionUseFormData={whereConditionUseFormData}
              whereConditionUseFieldArray={whereConditionUseFieldArray}
              whereConditionDefaultArrayValue={whereConditionDefaultArrayValue}
            />
          </WhereConditionWrapper>

          {/* <OptionsSelect>
          <OrderByComponent
            triggerQuery={triggerQuery}
            model={model}
            modelUpdate={modelUpdate}
            fieldOptionData={fieldOptionData}
            orderByUseFormData={orderByUseFormData}
            orderByUseFieldArray={orderByUseFieldArray}
            orderByDefaultArrayValue={orderByDefaultArrayValue}
          />
        </OptionsSelect>

        <SelectFieldWrapper>
          <SelectField
            triggerQuery={triggerQuery}
            model={model}
            modelUpdate={modelUpdate}
          />
        </SelectFieldWrapper> */}
        </QueryBuilderWrapper>
      )}
    </>
  );
};
export default QueryBuilder;
