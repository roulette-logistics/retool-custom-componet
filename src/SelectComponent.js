import React from 'react';
import { Controller } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import Select from "react-select";

const selectComponentStyle   =  {
  control: (base, state) => ({
      ...base,
      width: '95%',
      'min-height': '32px',
      minHeight:'32px',
      borderRadius:'8px',
      alignContent:'center',
      alignItems:'center',
      fontFamily: 'inter',
      fontSize: '13px',
  }),
  singleValue: (styles, { data }) => {
    return {
        ...styles,
        ...{
            color: "#2E2E2E",
            borderRadius: '4px',
            width: 'fit-content',
            paddingLeft: '10px',
            paddingRight: '10px',
            fontFamily: 'inter',
            fontSize: '13px',
        }

    }
},
option: (provided, state) => ({
      ...provided,
      paddingTop: '6px',
      color: state.data.disabled == true ? '#C7C7C7' :  "",
      paddingBottom: '6px',
      fontWeight: 400,
      wordWrap:'break-word',
      whiteSpace:'normal',
      fontSize: ' 14px',
      fontFamily: 'inter',
      backgroundColor: state.isSelected ? "#D6DCEF" : "white",
      marginTop:'2px',
      "&:hover": {
        color: state.data.disabled == true ? '#C7C7C7' :  "",
        backgroundColor: state.data.disabled == true ? "#FFFFFF" : "#F0F0F0"
    }
  }),
  placeholder:(provided) =>({
    ...provided,
    fontSize: '14px',
    fontFamily: 'inter',
  }),
  menuPortal: provided => ({ ...provided, zIndex: 9999 }),
  menu: provided => ({ ...provided, zIndex: 9999, color: '#7E7E7F' })
}

// options - value | label
const SelectComponent = ({ options, onChange, name, control, value, defaultValue, placeholder='' }) => {
  const DropdownIndicator = () => (
    <MdKeyboardArrowDown style={{ paddingRight: '7px' }} />
  );

  return (
    <>
    {(value || options) &&
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        value={value}
        render={({ field: { ref, ...field } }) => (
          <Select
            options={options}
            isOptionDisabled={(option) => option.disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            styles={
              selectComponentStyle
          }
            value={value}
            menuPortalTarget={document.body}
            components={{ IndicatorSeparator: () => null, DropdownIndicator }}
            onChange={(value) => {
              onChange(value);
            }}
          />
        )}
         />
        }
    </>
  )
}

export default SelectComponent