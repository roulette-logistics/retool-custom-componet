import React from 'react';
import Select from "react-select";
import { Controller, useWatch } from "react-hook-form";


// options - value | label
const SelectComponent = ({options, value, onChange}) => {
  return (
    <Select
    options={options}
    onChange={(value)=>{
        onChange(value);
    }}
  />
  )
}

export default SelectComponent