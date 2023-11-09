import TextField from "@mui/material/TextField";
import SelectComponent from "./SelectComponent";
import React, { useState } from "react";
import { dateTypeOptions } from "./QueryBuilderConstant";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { RiDeleteBinLine } from "react-icons/ri";
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Controller } from "react-hook-form";
const RightSideComponent = ({
  watch,
  control,
  setValue,
  index,
  register,
  dataType,
  operator,
}) => {
  const [showDateComponent, setShowDateComponent] = useState(false);

  // const showDropdownComponent = dataType == "date" && operator == "between";
  const showDropdownComponent = false;

  // const isShowDateComponent = showDropdownComponent && showDateComponent
  const isShowDateComponent = false;

  return (
    <div style={{ flexBasis: "35%" }}>
      { isShowDateComponent ? (
        <>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Basic date time picker" />
            </DemoContainer>
          </LocalizationProvider> */}

<Controller
                    control={control}
                    name={'filterDropDownData[].value'}
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
                            components={{
                                OpenPickerIcon: () => <RiDeleteBinLine/>
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
                                value={dayjs(value)}
                                onChange={(value)=>{

                                }}
                                renderInput={(params) => <TextField
                                    {...params}
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
      ) : 
      
      showDropdownComponent ? (
        <>
          {" "}
          <SelectComponent
            value={watch()?.filterDropDownData[index].value}
            control={control}
            name={`filterDropDownData[].value`}
            options={dateTypeOptions}
            onChange={(value) => {
              setValue(`filterDropDownData[${index}].value`, value);

              if (value.value == "choose_manually") {
                setShowDateComponent(true);
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
