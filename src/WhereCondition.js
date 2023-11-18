import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { CTAButton, ColumnSelectionWrapperWhere, DeleteIconWrapperWhereCondition, FieldSelection, FieldSelectorParentWrapper, OperatorWrapper, SelectComponentOperatorWrapper, SelectComponentWrapper, WholeWrapper } from "./Components/StyledComponents";
import {
  getSupoortedOperators,
  whereConditionOperator
} from "./QueryBuilderConstant";
import RightSideComponent from "./RightSideComponent";
import SelectComponent from "./SelectComponent";

const WhereCondition = ({ triggerQuery, model, modelUpdate, fieldOptionData, whereConditionDefaultArrayValue, whereConditionUseFormData, whereConditionUseFieldArray }) => {

  useEffect(() => {
    if (model.isEdit == true) {
      whereConditionUseFormData.reset(model.outputData);
    }
  }, [model]);


  const onSubmit = () => {
    // const formData = whereConditionUseFormData.watch();
    // modelUpdate({
    //   isBtnClicked: false,
    //   outputData: formData,
    // });

    // triggerQuery("get_query_payload");
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

                  <ColumnSelectionWrapperWhere>
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
                        <div style={{ flexBasis: "50%" }}>
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
                      </div>
                    )}

                    <DeleteIconWrapperWhereCondition>
                      <RiDeleteBinLine
                        className="pointer"
                        color="#B42318"
                        size={"20"}
                        onClick={() => {
                          whereConditionUseFieldArray.remove(index);
                        }}
                      />
                    </DeleteIconWrapperWhereCondition>

                  </ColumnSelectionWrapperWhere>
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