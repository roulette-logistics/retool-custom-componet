import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { OrderByOptionsData } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { modalClasses } from "@mui/material";

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
              </SelectFieldWrapper>
            </>
          );
        })}
      </div>
      <div>
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
              orderByUseFieldArray.append(orderByDefaultArrayValue);
            }}
            startIcon={<AiOutlinePlus />}
            variant="text"
          >
            Add Order By
          </Button>
        </section>
      </div>
    </>
  );
};

export default OrderByComponent;
