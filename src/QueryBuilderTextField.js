import React from 'react'
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const QueryBuilderTextField = ({control, register, name, onChange}) => {
  const handleCustomChange = (event, fieldOnChange) => {
    // Custom logic here
    console.log("Custom onChange logic:", event.target.value);
    onChange(event.target.value)
    // Call the React Hook Form onChange function
    fieldOnChange(event);
  };

  return (
    <>
   <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, ...field } }) => (
          <TextField
            {...field}
            InputProps={{
              style: {
                height: "32px",
                borderRadius: "8px",
                fontFamily: "inter",
                fontSize: "13px",
                backgroundColor: "white",
              },
            }}
            inputProps={{
              "aria-label": "none",
            }}
            onChange={(event) => handleCustomChange(event, onChange)}
          />
        )}
      />
  </>
  )
}

export default QueryBuilderTextField