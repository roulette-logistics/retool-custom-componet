import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { booleanOptionsData, dateTypeOptionsData, requiredErrorMessage } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
const RightSideComponent = ({
  watch,
  control,
  setValue,
  index,
  register,
  dataType,
  operator,
  name
}) => {
  const [defaultData, setDefaultDate] = useState(dayjs(new Date()));
  const showDropdownComponent = (dataType == "date"); 

  const isShowDateComponent = showDropdownComponent;

  const showBooleanDropdown = (dataType == "boolean");

      const DateHandleChange = (newValue) => {
        const formattedDate = new Date().toISOString();
        setValue(`filterDropDownData[${index}].value`, formattedDate);
        setDefaultDate(newValue);
    };

  return (
    <div style={{ flexBasis: "35%" }}>
      {isShowDateComponent ? (
        <>
        d
              <LocalizationProvider
                style={{
                  width: "95%",
                  backgroundColor: "red",
                  minHeight: "32px",
                  height: "32px",
                }}
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  PopperProps={{
                    sx: {
                      "& .MuiPickersDay-root": {
                        "height": "80px",
                        "&.Mui-selected": {
                          color: "#ffffff !important",
                        },
                      },
                      "& .css-3eghsz-PrivatePickersYear-button": {
                        "&.Mui-selected": {
                          color: "#ffffff !important",
                        },
                      },
                      "& .MuiInputBase-input": {
                        height: "80px" // Set your height here.
                      }
                    },
                  }}
                  // inputFormat="DD/MM/YYYY"
                  value={dayjs(defaultData)}
                  onChange={DateHandleChange}
                  renderInput={(params) => <TextField
                    size="small"
                    style={{ width: '50%' }}
                    {...register(name, { required: requiredErrorMessage })}
                    {...params} />}
                />
              </LocalizationProvider>
        </>
      ) : (showDropdownComponent || showBooleanDropdown) ? (
        <>
          {" "}
          <SelectComponent
            value={watch()?.filterDropDownData[index].value}
            control={control}
            name={`filterDropDownData[].value`}
            options={showDropdownComponent ? dateTypeOptionsData : showBooleanDropdown ? booleanOptionsData : []}
            onChange={(value) => {
              setValue(`filterDropDownData[${index}].value`, value);

              if (value.value == "choose_manually") {
                //
              }
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
              fontFamily: "inter",
              fontSize: "13px",
            },
          }}
          inputProps={{
            "aria-label": "none",
          }}
        />
      )}
    </div>
  );
};

export default RightSideComponent;
