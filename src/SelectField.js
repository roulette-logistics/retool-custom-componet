import React from 'react';
import Select from "react-select";
import { selectFieldAllFieldData } from './QueryBuilderConstant';

const reactSelectStyles =       {
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

const SelectField = ({ triggerQuery, model, modelUpdate }) => {
  
    const fieldOptionData = selectFieldAllFieldData.concat(model?.columnsData?.map((data) => {
        return {
          value: data.name,
          label: data.name,
          dataType: data.dataType,
          disabled: !data.isSupported, // if it is not supported then disable it
        };
      }))

  return (
    <div style={{marginTop:'12px', marginLeft:'10px'}}>
    <Select
    defaultValue={model?.selectFieldsOutput}
    isMulti
    onChange={(value)=>{
      // console.log('value', value);
      modelUpdate({
        selectFieldsOutput: value
      })
    }}
    styles={reactSelectStyles}
    options={model?.selectFieldsOutput.find((data)=> data.value == 'select_all') ? []:   fieldOptionData}
  />
  </div>
  )
}

export default SelectField