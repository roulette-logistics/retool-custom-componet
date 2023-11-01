import React from 'react';
import FieldArray from "./FieldArray";
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useForm } from "react-hook-form";
/* Default component model
  {
    "greeting": "Hello, ",  
    "username": {{ current_user.fullName }},
    "message": "Welcome to custom components!",
    "yesQuery": "yesQuery",
    "noQuery": "noQuery",
    "runQuery": "runQuery"
  }
*/

const ExampleComponent = ({ triggerQuery, model, modelUpdate }) => {
  const handleChange = (e) => {
    modelUpdate({
      greeting: e.target.value
    })
  }

  const defaultValues = {
    test: [
      {
        name: "useFieldArray1",
        nestedArray: [{ field1: "field1", field2: "field2" }]
      },
      {
        name: "useFieldArray2",
        nestedArray: [{ field1: "field1", field2: "field2" }]
      }
    ]
  };
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue
  } = useForm({
    defaultValues
  });
  const onSubmit = (data) => console.log("data", data);
  return(
    <>
          <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Array of Array Fields</h1>
      <p>
        The following example demonstrate the ability of building nested array
        field
      </p>

      <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors }}
      />

      <button type="button" onClick={() => reset(defaultValues)}>
        Reset
      </button>

   
      <input type="submit" />
    </form>
      </>
  );
}
export default ExampleComponent;