import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { booleanOptionsData, dateTypeOptionsData, requiredErrorMessage } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import { Controller } from 'react-hook-form';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

  const showDateTimeComponent = (dataType == "date_time");

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
           <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <LocalizationProvider
                            style={{
                                width: '95%',
                                minHeight: '32px',
                                height: '32px'
                            }}
                            //@ts-ignore
                            dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                            PopperProps={
                                {
                                    sx:{
                                        "& .MuiPickersDay-root": {
                                            "&.Mui-selected": {
                                                color:'#ffffff !important'
                                            },
                                          },
                                          "& .css-3eghsz-PrivatePickersYear-button":{
                                                "&.Mui-selected":{
                                                color:'#ffffff !important'
                                                }
                                          }
                                      }
                                }
                            }
                                inputFormat="DD/MM/YYYY"
                                value={dayjs(value)}
                                sx={{ height: '20px', maxHeight:'10px','.MuiInputBase-input': { maxHeight:'5px',height: '20px',backgroundColor:'red' } }}
                                onChange={DateHandleChange}
                                renderInput={(params) => <TextField
                                    {...params}
                                    sx={{ height: '20px', '.MuiInputBase-input': { height: '20px',backgroundColor:'red' } }}
                                    style={{
                                        width: '95%',
                                        minHeight: '32px',
                                        height: '32px'
                                    }}
                                />
                                }
                            />
                        </LocalizationProvider>
                    )}
                />
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
      ) : false ? <>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value}
                  onChange={DateHandleChange}
                  renderInput={(params) =><TextField
                    {...params}
                    sx={{ height: '20px', '.MuiInputBase-input': { height: '20px',backgroundColor:'red' } }}
                    style={{
                        width: '95%',
                        minHeight: '32px',
                        height: '32px'
                    }}
                />}
                />
              )}
            />
          </LocalizationProvider>
      </> : (
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
