import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { OperatorData, whereConditionOperator } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";

const ExampleComponent = ({ triggerQuery, model, modelUpdate }) => {
  const fieldOptionData = model?.columnsData?.map((data) => {
    return {
      value: data.name,
      label: data.name,
      dataType: data.dataType,
      disabled: !data.isSupported, // if it is not supported then disable it
    };
  });
  
  const defaultArrayValue = {
    columnsListArray: fieldOptionData ||model.outputData?.filterDropDownData[0]?.columnsListArray ||[],
    operatorArrayData: [],
    column: "",
    operator: OperatorData[0],
    value: "",
    betweenValue: whereConditionOperator[0],
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






  const onSubmit = (data) => {
    const formData = watch();
    modelUpdate({
      isBtnClicked: false,
      outputData: formData,
    });

    triggerQuery("get_query_payload");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              // maxHeight: "300px",
              overflowY: "scroll",
              flex: 1,
              paddingLeft: "5px",
            }}
          >
            {fields.map((item, index) => {
              return (
                <>
                  <div key={index} style={{ width: "100%" }}>
                    {index !== 0 ? (
                      <div
                        style={{
                          width: "90px",
                          marginTop: "12px",
                          marginBottom: "2px",
                        }}
                      >
                        <SelectComponent
                          name={`filterDropDownData[${index}].betweenValue`}
                          value={
                            watch()?.filterDropDownData[index].betweenValue
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
                      </div>
                    ) : null}

                    <div
                      style={{
                        display: "flex",
                        marginTop: "12px",
                        flexDirection: "row",
                        border: "1px solid #D0D5DD",
                        alignItems: "center",
                        backgroundColor: "#FCFCFD",
                        borderRadius: "12px",
                        padding: "16px",
                        width: "94%",
                        gap: "15px",
                      }}
                    >
                      <div style={{ flexBasis: "35%" }}>
                        <SelectComponent
                          control={control}
                          placeholder="Select Column"
                          value={watch()?.filterDropDownData[index]?.column}
                          name={`filterDropDownData[${index}].column`}
                          options={
                            watch()?.filterDropDownData[index]?.columnsListArray
                          }
                          onChange={(column) => {
                            setValue(
                              `filterDropDownData[${index}].column`,
                              column
                            );
                          }}
                        />
                      </div>

                      <div style={{ flexBasis: "35%" }}>
                        <SelectComponent
                          name={`filterDropDownData[${index}].operator`}
                          value={watch()?.filterDropDownData[index]?.operator}
                          control={control}
                          options={OperatorData}
                          onChange={(operator) => {
                            setValue(
                              `filterDropDownData[${index}].operator`,
                              operator
                            );
                          }}
                        />
                      </div>

                      <div style={{ flexBasis: "25%" }}>
                        {false ? (
                          <>
                            {" "}
                            <SelectComponent
                              value={watch()?.filterDropDownData[index].value}
                              control={control}
                              name={`filterDropDownData[].value`}
                              options={[]}
                              onChange={(value) => {
                                setValue(
                                  `filterDropDownData[${index}].value`,
                                  value
                                );
                              }}
                            />
                          </>
                        ) : (
                          <TextField
                            {...register(`filterDropDownData[${index}].value`)}
                            InputProps={{
                              style: {
                                height: "32px",
                                borderRadius: "8px",
                                fontFamily: 'inter',
                                fontSize: '13px',
                              },
                            }}
                            inputProps={{
                              "aria-label": "none",
                            }}
                          />
                        )}
                      </div>

                      <div style={{ flexBasis: "5%" }}>
                        <RiDeleteBinLine
                          className="pointer"
                          color="#B42318"
                          size={"20"}
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

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
        </div>
      </form>
    </>
  );
};
export default ExampleComponent;
