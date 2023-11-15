import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useState } from "react";
import './style.css'
import { Controller } from 'react-hook-form';
import { booleanOptionsData, dateTypeOptionsData } from "./QueryBuilderConstant";
import SelectComponent from "./SelectComponent";
import { FaCalendarAlt } from "react-icons/fa";

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
        setDefaultDate(newValue);
        
        const selectedDate = new Date(newValue)
        if (selectedDate) {
          const day = selectedDate.getDate();
          const month = selectedDate.getMonth() + 1; // Months are 0-indexed
          const year = selectedDate.getFullYear();
          
          console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
          
          setValue(`filterDropDownData[${index}].value`, `${day}-${month}-${year}`);
      }
    };

  return (
    <div style={{ flexBasis: "35%" }}>
      {isShowDateComponent ? (
        <>
        <div>
        <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <LocalizationProvider
                            //@ts-ignore
                            dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                            value={dayjs(defaultData)}
                             slotProps={{ textField: { size: 'small' } }}
                             components={{
                              OpenPickerIcon: () => <FaCalendarAlt size={15} />
                            }}
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
                                onChange={DateHandleChange}
                                renderInput={(params) => <TextField
                                    {...params}
                                    style={{
                                        width: '95%',
                                        minHeight: '32px',
                                        height: '32px'
                                    }}
                                    InputProps={{
                                      style: {
                                        height: "32px",
                                        borderRadius: "8px",
                                        fontFamily: "inter",
                                        fontSize: "13px",
                                        backgroundColor:'white'
                                      },
                                    }}
                                />
                                }
                            />
                        </LocalizationProvider>
                    )}
                />
                </div>
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
                    {...register(`filterDropDownData[${index}].value`)}
                    {...params}
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
              backgroundColor:'white'
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
