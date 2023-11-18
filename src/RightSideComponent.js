import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BetweenDateComponentWrapper } from "./Components/StyledComponents";
import DateComponent from "./DateComponent";
import {
  booleanOptionsData,
  dateTypeOptionsData,
} from "./QueryBuilderConstant";
import QueryBuilderTextField from "./QueryBuilderTextField";
import SelectComponent from "./SelectComponent";
import "./style.css";

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
  const [dropDownValue, setDropDownValue] = useState(null);

  const [defaultDate, setDefaultDate] = useState(dayjs(new Date()));
  const [fromDefaultValue, setFromDefaultValue] = useState(dayjs(new Date()));
  const [toDefaultValue, setToDefaultValue] = useState(dayjs(new Date()));

  const [showDateComponent, setShowDateComponent] = useState(false);

  const [showDropdownComponent, setShowDropdownComponent] = useState(false);
  const [showDateTimeComponent, setShowDateTimeComponent] = useState(false);
  const [showTwoDateComponent, setShowTwoDateComponent] = useState(false);
  const [showBooleanDropdown, setShowBooleanDropdown] = useState(false);
  const [showTwoTextField, setShowTwoTextField] = useState(false);

  useEffect(() => {
    setShowDateTimeComponent(false);
    setShowDateComponent(false);
    setShowDropdownComponent(false);
    setShowBooleanDropdown(false);
    setShowTwoTextField(false);
    setShowTwoDateComponent(false);

    if (
      (dataType == "date" || dataType == "date_time") && operator == "between" && dropDownValue != "choose_manually") 
    { setShowDropdownComponent(true);
    } else if (dataType == "date" && operator != "between") {
      setShowDateComponent(true);
    } else if (dataType == "boolean") {
      setShowBooleanDropdown(true);
    } else if (dataType == "date" && dropDownValue == "choose_manually"){
      setShowTwoDateComponent(true);
    } else if (dropDownValue == "choose_manually" && dataType == "date_time" && operator == "between") {
      setShowTwoTextField(true);
    } else if (dataType == "date_time") {
      setShowDateTimeComponent(true);
    }
  }, [dataType, operator, dropDownValue]);

  const DateHandleChange = (newValue) => {
    setDefaultDate(newValue);

    const selectedDate = new Date(newValue);
    if (selectedDate) {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Months are 0-indexed
      const year = selectedDate.getFullYear();
      setValue(`filterDropDownData[${index}].value`, `${day}-${month}-${year}`);
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
    }
  };

  return (
    <>
      {showTwoDateComponent ? (
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
      ) : showTwoTextField ? (
        <>
          <BetweenDateComponentWrapper>
            <QueryBuilderTextField
              register={register}
              name={`filterDropDownData[${index}].fromValue`}
            />
            <QueryBuilderTextField
              register={register}
              name={`filterDropDownData[${index}].toValue`}
            />
          </BetweenDateComponentWrapper>
        </>
      ) : showDropdownComponent || showBooleanDropdown ? (
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

            setDropDownValue(value.value);
            // if (value.value == "choose_manually" && dataType == "date") {
            //   setShowTwoDateComponent(true);
            // } else if (
            //   value.value == "choose_manually" &&
            //   dataType == "date_time"
            // ) {
            //   setShowTwoTextField(true);
            // }
          }}
        />
      ) : showDateTimeComponent ? (
        <QueryBuilderTextField
          register={register}
          name={`filterDropDownData[${index}].value`}
        />
      ) : showDateComponent ? (
        <DateComponent
          control={control}
          value={dayjs(defaultDate)}
          dateOnChange={DateHandleChange}
          name={name}
        />
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
