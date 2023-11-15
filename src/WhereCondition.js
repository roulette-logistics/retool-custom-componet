import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
import {
  getSupoortedOperators,
  whereConditionOperator
} from "./QueryBuilderConstant";
import RightSideComponent from "./RightSideComponent";
import SelectComponent from "./SelectComponent";
import { CTAButton } from "./Components/StyledComponents";

const FieldSelectorParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const OperatorWrapper = styled.div`
  // max-height: 300px; // Uncomment if needed
  overflow-y: scroll;
  flex: 1;
  padding-left: 5px;
`;

// Styled component
const FieldSelection = styled.div`
  width: 90px;
  margin-top: 12px;
  margin-bottom: 2px;
`;

// Styled component
const ColumnSelectionWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
  border: 1px solid #d0d5dd;
  align-items: center;
  background-color: #fcfcfd;
  border-radius: 12px;
  padding: 16px;
  width: 94%;
  gap: 15px;
`;

const WholeWrapper = styled.div`
  width: 97%;
`

const SelectComponentWrapper = styled.div`
  flex-basis: 35%;
`

const SelectComponentOperatorWrapper = styled.div`
  flex-basis: 25%;
`
const DeleteIconWrapper = styled.div`
  flex-basis: 5%;
  right: 0;
`

const WhereCondition = ({ triggerQuery, model, modelUpdate, fieldOptionData, whereConditionDefaultArrayValue, whereConditionUseFormData, whereConditionUseFieldArray }) => {


  useEffect(() => {
    if (model.isEdit == true) {
      whereConditionUseFormData.reset(model.outputData);
    }
  }, [model]);


  const onSubmit = () => {
    const formData = whereConditionUseFormData.watch();
    modelUpdate({
      isBtnClicked: false,
      outputData: formData,
    });

    triggerQuery("get_query_payload");
  };

  return (
    <form onSubmit={whereConditionUseFormData.handleSubmit(onSubmit)}>
      <FieldSelectorParentWrapper>
        <OperatorWrapper>
          {whereConditionUseFieldArray.fields.map((item, index) => {
            return (
              <>
                <WholeWrapper index={index}>
                  {index !== 0 ? (
                    <FieldSelection>
                      <SelectComponent
                        name={`filterDropDownData[${index}].betweenValue`}
                        value={
                          whereConditionUseFormData.watch()?.filterDropDownData[index]?.betweenValue || {}
                        }
                        control={whereConditionUseFormData.control}
                        options={whereConditionOperator}
                        onChange={(betweenValue) => {
                          whereConditionUseFormData.setValue(
                            `filterDropDownData[${index}].betweenValue`,
                            betweenValue
                          );
                        }}
                      />
                    </FieldSelection>
                  ) : null}

                  <ColumnSelectionWrapper
                  >
                    <SelectComponentWrapper>
                      <SelectComponent
                        control={whereConditionUseFormData.control}
                        placeholder="Select Column"
                        value={whereConditionUseFormData.watch()?.filterDropDownData?.[index]?.column || {}}
                        name={`filterDropDownData[${index}].column`}
                        options={
                          fieldOptionData || model.outputData?.filterDropDownData?.[0]?.columnsListArray || []
                        }
                        onChange={(column) => {
                          whereConditionUseFormData.setValue(`filterDropDownData[${index}].value`, "");
                          whereConditionUseFormData.setValue(`filterDropDownData[${index}].dataType`, column.dataType);
                          whereConditionUseFormData.setValue(
                            `filterDropDownData[${index}].column`,
                            column
                          );
                        }}
                      />
                    </SelectComponentWrapper>

                    <SelectComponentOperatorWrapper>
                      <SelectComponent
                        name={`filterDropDownData[${index}].operator`}
                        value={whereConditionUseFormData.watch()?.filterDropDownData?.[index]?.operator || {}}
                        control={whereConditionUseFormData.control}
                        options={getSupoortedOperators(whereConditionUseFormData.watch()?.filterDropDownData[index]?.dataType || [])}
                        onChange={(operator) => {
                          whereConditionUseFormData.setValue(
                            `filterDropDownData[${index}].operator`,
                            operator
                          );
                        }}
                      />
                    </SelectComponentOperatorWrapper>

                    {whereConditionUseFormData.watch()?.filterDropDownData[index]?.operator?.value ==
                      "isNull" ? <SelectComponentWrapper></SelectComponentWrapper> : (
                      <RightSideComponent
                        name={`filterDropDownData[].value`}
                        watch={whereConditionUseFormData.watch}
                        control={whereConditionUseFormData.control}
                        setValue={whereConditionUseFormData.setValue}
                        index={index}
                        register={whereConditionUseFormData.register}
                        dataType={whereConditionUseFormData.watch()?.filterDropDownData[index].column?.dataType}
                        operator={whereConditionUseFormData.watch()?.filterDropDownData[index]?.operator?.value}
                      />
                    )}

                    <DeleteIconWrapper>
                      <RiDeleteBinLine
                        className="pointer"
                        color="#B42318"
                        size={"20"}
                        onClick={() => {
                          whereConditionUseFieldArray.remove(index);
                        }}
                      />
                    </DeleteIconWrapper>

                  </ColumnSelectionWrapper>
                </WholeWrapper>
              </>
            );
          })}
        </OperatorWrapper>

        <section>
          <CTAButton
            onClick={() => {
              whereConditionUseFieldArray.append(whereConditionDefaultArrayValue);
            }}
            startIcon={<AiOutlinePlus />}
            variant="text"
          >
            Add Condition
          </CTAButton>
        </section>
      </FieldSelectorParentWrapper>
    </form>
  )
}

export default WhereCondition