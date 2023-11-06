import React from 'react';
import Select from "react-select";
import { AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Controller, useWatch } from "react-hook-form";
import { requiredErrorMessage } from './QueryBuilderConstant';



// options - value | label
const SelectComponent = ({ options, onChange, name, control, value, defaultValue, placeholder='' }) => {
console.log('value tt', value)
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
                      paddingBottom: '6px',
                      fontWeight: 400,
                      wordWrap:'break-word',
                      whiteSpace:'normal',
                      fontSize: ' 14px'
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