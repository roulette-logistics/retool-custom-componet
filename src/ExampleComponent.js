import Button from "@mui/material/Button";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlinePlayCircle, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { OperatorData, whereConditionOperator } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import TextField from "@mui/material/TextField";

const ExampleComponent = ({ triggerQuery, model, modelUpdate }) => {
  const fieldOptionData = model?.columnsData.map((data) => {
    return {
      value: data.column_name,
      label: data.column_name,
    };
  });

  const defaultArrayValue = {
    columnsListArray: fieldOptionData,
    operatorArrayData: [],
    column: "",
    operator: OperatorData[0],
    value: "",
    betweenValue: whereConditionOperator[0],
  };

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      filterDropDownData: [defaultArrayValue],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "filterDropDownData",
  });

  const onSubmit = (data) => {
    modelUpdate({
      greeting: 5,
    });
    console.log("555555", model);
    console.log("data", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            maxHeight: "300px",
            overflowY: "scroll",
            paddingLeft: "5px",
          }}
        >
          {fields.map((item, index) => {
            console.log("item mm", item);
            return (
              <>
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
                    value={watch()?.filterDropDownData[index].betweenValue}
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
                ): null}

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
                    width: "80%",
                    gap: "15px",
                  }}
                >
                  <div style={{ flexBasis: "35%" }}>
                    <SelectComponent
                      control={control}
                      placeholder="Select Column"
                      value={
                        watch()?.filterDropDownData[index]?.column
                      }
                      name={`filterDropDownData[${index}].column`}
                      options={
                        watch()?.filterDropDownData[index]?.columnsListArray
                      }
                      onChange={(column) => {
                        console.log("test", column);
                        setValue(
                          `filterDropDownData[${index}].column`,
                          column
                        );
                        console.log("watch", watch(`filterDropDownData`));
                      }}
                    />
                  </div>

                  <div style={{ flexBasis: "35%" }}>
                    <SelectComponent
                      name={`filterDropDownData[${index}].operator`}
                      value={
                        watch()?.filterDropDownData[index]
                          ?.operator
                      }
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
                        {...register(
                          `filterDropDownData[${index}].value`
                        )}
                        InputProps={{
                          style: {
                            height: "32px",
                            borderRadius: "8px",
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

        <Button
        onClick={handleSubmit(onSubmit)}
          style={{
            height: "30px",
            color: "#344054",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "14px",
            border: "1px solid #D0D5DD",
          }}
          component="label"
          type="submit"
          variant="outlined"
          startIcon={<AiOutlinePlayCircle />}
        >
          Test Query
        </Button>
      </form>
    </>
  );
};
export default ExampleComponent;
