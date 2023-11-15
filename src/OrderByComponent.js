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

const OrderByComponent = ({ triggerQuery, model, modelUpdate, orderBySubmit }) => {
  const fieldOptionData = model?.columnsData?.map((data) => {
    return {
      value: data.name,
      label: data.name,
      dataType: data.dataType,
      disabled: !data.isSupported, // if it is not supported then disable it
    };
  });

  const defaultArrayValue = {
    columnValue: "",
    orderValue: "",
  };

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      orderByData: [defaultArrayValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderByData",
  });

  useEffect(() => {
    if (orderBySubmit == true) {
      onSubmit();
    }

    if (model.isEdit == true) {
      reset(model.outputData);
      modelUpdate({
        isEdit: false,
      });
    }
  },[]);

  const onSubmit = () => {
    const formData = watch();
    modelUpdate({
      isBtnClicked: false,
      outputData: formData,
    });
  }

  return (
    <>
      <div>
        {fields.map((data, index) => {
          return (
            <>
              <SelectFieldWrapper key={index}>
                <div style={{ width: "100%" }}>
                  <SelectComponent
                    control={control}
                    placeholder="Select Column"
                    value={watch()?.orderByData?.[index]?.columnValue || {}}
                    name={`orderByData[${index}].column`}
                    options={
                      fieldOptionData ||
                      model.outputData?.orderByData?.[0]?.columnsListArray ||
                      []
                    }
                    onChange={(value) => {
                      console.log("value", value);
                      console.log("watch", watch());
                      console.log("data", model);
                      setValue(`orderByData[${index}].columnValue`, value);
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <SelectComponent
                    name={`orderByData[${index}].orderValue`}
                    value={watch()?.orderByData[index]?.orderValue || {}}
                    control={control}
                    options={OrderByOptionsData}
                    onChange={(orderValue) => {
                      setValue(`orderByData[${index}].orderValue`, orderValue);
                    }}
                  />
                </div>

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
              append(defaultArrayValue);
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
