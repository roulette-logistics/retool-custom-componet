import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import React, { useState } from "react";
import DateComponent from "./DateComponent";
import {
  booleanOptionsData,
  dateTypeOptionsData,
} from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import "./style.css";
import { BetweenDateComponentWrapper } from "./Components/StyledComponents";

const RightSideComponent = ({
  watch,
  control,
  setValue,
  index,
  register,
  dataType,
  operator,
  name,
}) => {
  const [defaultDate, setDefaultDate] = useState(dayjs(new Date()));

  const [fromDefaultValue, setFromDefaultValue] = useState(dayjs(new Date()));
  const [toDefaultValue, setToDefaultValue] = useState(dayjs(new Date()));

  const [showTwoDateComponent, setShowTwoDateComponent] = useState(false);
  const showDropdownComponent = dataType == "date" && operator == "between";

  const showDateTimeComponent = dataType == "date_time";

  const isShowDateComponent = dataType == "date" && operator != "between";

  const showBooleanDropdown = dataType == "boolean";

  const DateHandleChange = (newValue) => {
    setDefaultDate(newValue);

    const selectedDate = new Date(newValue);
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are 0-indexed
      const year = selectedDate.getFullYear();
      setValue(`filterDropDownData[${index}].value`, `${day}-${month}-${year}`);
      console.log("DateHandleChange value", watch());
    }
  };

  const DateHandleChangeFrom = (newValue) => {
    setFromDefaultValue(newValue);

    const selectedDate = new Date(newValue);
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are 0-indexed
      const year = selectedDate.getFullYear();
      const dateValue = `${day}-${month}-${year}`;

      setValue(`filterDropDownData[${index}].fromValue`, dateValue);
      setValue(`filterDropDownData[${index}].value`, {
        ...watch()?.filterDropDownData[index].value,
        from_value: dateValue,
      });
      console.log("DateHandleChangeFrom value", watch());
    }
  };

  const DateHandleChangeTo = (newValue) => {
    setToDefaultValue(newValue);

    const selectedDate = new Date(newValue);
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are 0-indexed
      const year = selectedDate.getFullYear();
      const dateValue = `${day}-${month}-${year}`;

      setValue(`filterDropDownData[${index}].toValue`, dateValue);
      setValue(`filterDropDownData[${index}].value`, {
        ...watch()?.filterDropDownData[index].value,
        to_value: dateValue,
      });
      console.log("DateHandleChangeTo value", watch());
    }
  };

  return (
    <>
      {showTwoDateComponent ? (
        <>
          <BetweenDateComponentWrapper>
            <DateComponent
              control={control}
              value={dayjs(fromDefaultValue)}
              dateOnChange={DateHandleChangeFrom}
              name={"filterDropDownData[].fromValue"}
            />

            <DateComponent
              control={control}
              value={dayjs(toDefaultValue)}
              dateOnChange={DateHandleChangeTo}
              name={"filterDropDownData[].toValue"}
            />
          </BetweenDateComponentWrapper>
        </>
      ) : showDropdownComponent || showBooleanDropdown ? (
        <>
          {" "}
          <SelectComponent
            value={watch()?.filterDropDownData[index].value}
            control={control}
            name={`filterDropDownData[].value`}
            options={
              showDropdownComponent
                ? dateTypeOptionsData
                : showBooleanDropdown
                ? booleanOptionsData
                : []
            }
            onChange={(value) => {
              setValue(`filterDropDownData[${index}].value`, value);

              if (value.value == "choose_manually" && dataType == "date") {
                setShowTwoDateComponent(true);
              }
            }}
          />
        </>
      ) : showDateTimeComponent ? (
        <>
          <QueryBuilderTextField
            register={register}
            name={`filterDropDownData[${index}].value`}
          />
        </>
      ) : isShowDateComponent ? (
        <>
          <div>
            <DateComponent
              control={control}
              value={dayjs(defaultDate)}
              dateOnChange={DateHandleChange}
              name={name}
            />
          </div>
        </>
      ) : (
        <QueryBuilderTextField
          register={register}
          name={`filterDropDownData[${index}].value`}
        />
      )}
    </>
  );
};

export default RightSideComponent;
