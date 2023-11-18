import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from 'react';
import { Controller } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const DateComponent = ({control, value, dateOnChange, name}) => {
  return (
    <Controller
    control={control}
    name={name}
    render={() => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={value}
          slotProps={{ textField: { size: "small" } }}
          components={{
            OpenPickerIcon: () => <FaCalendarAlt size={15} />,
          }}
          PopperProps={{
            sx: {
              "& .MuiPickersDay-root": {
                "&.Mui-selected": {
                  color: "#ffffff !important",
                },
              },
              "& .css-3eghsz-PrivatePickersYear-button": {
                "&.Mui-selected": {
                  color: "#ffffff !important",
                },
              },
            },
          }}
          inputFormat="DD/MM/YYYY"
          onChange={dateOnChange}
          renderInput={(params) => (
            <TextField
              {...params}
              style={{
                width: "100%",
                minHeight: "32px",
                height: "32px",
              }}
              InputProps={{
                style: {
                  height: "32px",
                  borderRadius: "8px",
                  fontFamily: "inter",
                  fontSize: "13px",
                  backgroundColor: "white",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    )}
  />
  )
}

export default DateComponent