import React from 'react';
import { Controller } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";
import Select from "react-select";



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
              {
                  groupHeading: (base) => ({
                      ...base,
                      flex: '1 1',
                      color: 'white',
                      margin: 0,
                  }),
                  control: (base, state) => ({
                      ...base,
                      width: '95%',
                      'min-height': '32px',
                      minHeight:'32px',
                      borderRadius:'8px',
                      alignContent:'center',
                      alignItems:'center'
                  }),
                  singleValue: (styles, { data }) => {
                    return {
                        ...styles,
                        ...{
                            color: "#2E2E2E",
                            borderRadius: '4px',
                            width: 'fit-content',
                            paddingLeft: '10px',
                            paddingRight: '10px'
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
                      "&:hover": {
                        color: state.data.disabled == true ? '#C7C7C7' :  "",
                        backgroundColor: state.data.disabled == true ? "#C7C7C7" : ""
                    }
                  }),
                  menuPortal: provided => ({ ...provided, zIndex: 9999 }),
                  menu: provided => ({ ...provided, zIndex: 9999, color: '#7E7E7F' })
              }
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