import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import styled from "styled-components";
import { OrderByOptionsData } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import { CTAButton } from "./Components/StyledComponents";

// Styled component
const SelectFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    align-items: center;
`;

const DeleteIconWrapper = styled.div`
  flex-basis: 5%;
  right: 0;
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

const OrderByComponent = ({ triggerQuery, model, modelUpdate, fieldOptionData, orderByUseFormData, orderByUseFieldArray, orderByDefaultArrayValue  }) => {

  useEffect(() => {
    if (model.isEdit == true) {
      orderByUseFormData.reset(model.outputData);
      modelUpdate({
        isEdit: false,
      });
    }
  },[model]);

  return (
    <>
      <div>
        {orderByUseFieldArray.fields.map((data, index) => {
          return (
            <>
              <SelectFieldWrapper key={index}>
              <ColumnSelectionWrapper>
                <div style={{ width: "100%" }}>
                  <SelectComponent
                    control={orderByUseFormData.control}
                    placeholder="Select Column"
                    value={orderByUseFormData.watch()?.orderByData?.[index]?.columnValue || {}}
                    name={`orderByData[${index}].column`}
                    options={
                      fieldOptionData ||
                      model.outputData?.orderByData?.[0]?.columnsListArray ||
                      []
                    }
                    onChange={(value) => {
                      console.log("value", value);
                      console.log("watch", orderByUseFormData.watch());
                      console.log("data", model);
                      orderByUseFormData.setValue(`orderByData[${index}].columnValue`, value);
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <SelectComponent
                    name={`orderByData[${index}].orderValue`}
                    value={orderByUseFormData.watch()?.orderByData[index]?.orderValue || {}}
                    control={orderByUseFormData.control}
                    options={OrderByOptionsData}
                    onChange={(orderValue) => {
                      orderByUseFormData.setValue(`orderByData[${index}].orderValue`, orderValue);
                    }}
                  />
                </div>

                <DeleteIconWrapper>
                  <RiDeleteBinLine
                    className="pointer"
                    color="#B42318"
                    size={"20"}
                    onClick={() => {
                      orderByUseFieldArray.remove(index);
                    }}
                  />
                </DeleteIconWrapper>
                </ColumnSelectionWrapper>
              </SelectFieldWrapper>
            </>
          );
        })}
      </div>
      <div>
        <section>
          <CTAButton
            onClick={() => {
              orderByUseFieldArray.append(orderByDefaultArrayValue);
            }}
            startIcon={<AiOutlinePlus />}
            variant="text"
          >
            Add Order By
          </CTAButton>
        </section>
      </div>
    </>
  );
};

export default OrderByComponent;
