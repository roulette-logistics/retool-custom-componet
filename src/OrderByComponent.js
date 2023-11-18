import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { CTAButton, ColumnSelectionWrapper, DeleteIconWrapper, SelectFieldWrapper } from "./Components/StyledComponents";
import { OrderByOptionsData } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";



const OrderByComponent = ({ triggerQuery, model, modelUpdate, fieldOptionData, orderByUseFormData, orderByUseFieldArray, orderByDefaultArrayValue  }) => {

  // useEffect(() => {
  //   if (model.isEdit == true) {
  //     orderByUseFormData.reset(model.outputData);
  //     modelUpdate({
  //       isEdit: false,
  //     });
  //   }
  // },[model]);

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
