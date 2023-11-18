import React from 'react'
import TextField from "@mui/material/TextField";

const QueryBuilderTextField = ({register, name, onChange}) => {
  return (
    <>
    <TextField
    className="full-width"
    {...register(name)}
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
  />
  </>
  )
}

export default QueryBuilderTextField