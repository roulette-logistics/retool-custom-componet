import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  OperatorData,
  getSupoortedOperators,
  whereConditionOperator,
} from "./QueryBuilderConstant";
import RightSideComponent from "./RightSideComponent";
import SelectComponent from "./SelectComponent";
import styled from "styled-components";

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
  width: 100%;
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

const WhereCondition = ({ triggerQuery, model, modelUpdate }) => {

  const fieldOptionData = model?.columnsData?.map((data) => {
    return {
      value: data.name,
      label: data.name,
      dataType: data.dataType,
      disabled: !data.isSupported, // if it is not supported then disable it
    };
  });

  const defaultArrayValue = {
    columnsListArray: fieldOptionData || model.outputData?.filterDropDownData?.[0]?.columnsListArray || [],
    operatorArrayData: [],
    column: "",
    operator: OperatorData[0],
    value: "",
    betweenValue: whereConditionOperator[0],
    dataType: ""
  };

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      filterDropDownData: [defaultArrayValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "filterDropDownData",
  });


  useEffect(() => {
    if (model.isBtnClicked == true) {
      onSubmit();
    }

    if (model.isEdit == true) {
      reset(model.outputData);
      modelUpdate({
        isEdit: false,
      });
    }
  }, [model]);


  const onSubmit = () => {
    const formData = watch();
    modelUpdate({
      isBtnClicked: false,
      outputData: formData,
    });

    triggerQuery("get_query_payload");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSelectorParentWrapper>
        <OperatorWrapper
        >
          {fields.map((item, index) => {
            return (
              <>
                <WholeWrapper index={index}>
                  {index !== 0 ? (
                    <FieldSelection>
                      <SelectComponent
                        name={`filterDropDownData[${index}].betweenValue`}
                        value={
                          watch()?.filterDropDownData[index]?.betweenValue || {}
                        }
                        control={control}
                        options={whereConditionOperator}
                        onChange={(betweenValue) => {
                          setValue(
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
                        control={control}
                        placeholder="Select Column"
                        value={watch()?.filterDropDownData?.[index]?.column || {}}
                        name={`filterDropDownData[${index}].column`}
                        options={
                          watch()?.filterDropDownData[index]?.columnsListArray
                        }
                        onChange={(column) => {
                          setValue(`filterDropDownData[${index}].value`, "");
                          setValue(`filterDropDownData[${index}].dataType`, column.dataType);
                          setValue(
                            `filterDropDownData[${index}].column`,
                            column
                          );
                        }}
                      />
                    </SelectComponentWrapper>

                    <SelectComponentOperatorWrapper>
                      <SelectComponent
                        name={`filterDropDownData[${index}].operator`}
                        value={watch()?.filterDropDownData?.[index]?.operator || {}}
                        control={control}
                        options={getSupoortedOperators(watch()?.filterDropDownData[index]?.dataType || [])}
                        onChange={(operator) => {
                          setValue(
                            `filterDropDownData[${index}].operator`,
                            operator
                          );
                        }}
                      />
                    </SelectComponentOperatorWrapper>

                    {watch()?.filterDropDownData[index]?.operator?.value ==
                      "isNull" ? <SelectComponentWrapper></SelectComponentWrapper> : (
                      <RightSideComponent
                        name={`filterDropDownData[].value`}
                        watch={watch}
                        control={control}
                        setValue={setValue}
                        index={index}
                        register={register}
                        dataType={watch()?.filterDropDownData[index].column?.dataType}
                        operator={watch()?.filterDropDownData[index]?.operator?.value}
                      />
                    )}

                    <DeleteIconWrapper>
                      <RiDeleteBinLine
                        className="pointer"
                        color="#B42318"
                        size={"20"}
                        onClick={() => {
                          remove(index);
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
          <Button
            style={{
              color: "#3054B9",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Inter",
            }}
            onClick={() => {
              append(defaultArrayValue);
            }}
            startIcon={<AiOutlinePlus />}
            variant="text"
          >
            Add Condition
          </Button>
        </section>
      </FieldSelectorParentWrapper>
    </form>
  )
}

export default WhereCondition