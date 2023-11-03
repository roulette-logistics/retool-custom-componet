import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import Select from "react-select";
import SelectComponent from "./SelectComponent";
import { OperatorData } from "./QueryBuilderConstant";

const ExampleComponent = ({ triggerQuery, model, modelUpdate }) => {


  const fieldOptionData = model?.columnsData.map((data)=>{
    return {
      value:data.column_name,
      label:data.column_name
    }
  })

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      filterDropDownData: [{ columnsListArray: fieldOptionData, operatorArrayData: [], columnSelectedValue:"", operatorSelectedValue:"",filterValue:""  }],
    },
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "filterDropDownData",
  });

  const onSubmit = (data) => {
    console.log('555555',model)
    modelUpdate({
      greeting: 5,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((item, index) => {
            return (
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', width:'100%', gap:'15px'}}>
            
            <div  style={{flexBasis:'35%'}}>
            <SelectComponent 
            value={''} 
            options={watch()?.filterDropDownData[index]?.columnsListArray} 
            onChange={(dropDownValue)=>{
                console.group('test', dropDownValue)
            }}/>
            </div>


            <div  style={{flexBasis:'35%'}}>
            <SelectComponent options={OperatorData}/>
            </div>


            <div  style={{flexBasis:'25%'}}>
            <SelectComponent options={[]}/>
            </div>
          
            <div  style={{flexBasis:'5%'}}>
                <RiDeleteBinLine
                  className="pointer"
                  color="#B42318"
                  size={"20"}
                  onClick={() => {
                    remove(index);
                  }}
                />
                </div>

              </div>
            );
          })}
        <section>
          <button
            type="button"
            onClick={() => {
              append({ firstName: "appendBill", lastName: "appendLuo" });
            }}
          >
            Add Condition
          </button>
        </section>

        <input type="submit" value={"Done"} />
      </form>
    </>
  );
};
export default ExampleComponent;
