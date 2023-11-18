export const OperatorData = [
  {
    value: "=",
    label: "=",
    supported:['text','number','date','boolean']
  },
  {
    value: "!=",
    label: "<> (NOT EQ)",
    supported:['text','number','date','boolean']
  },
  {
    value: "<",
    label: "<",
    supported:['number','date']
  },
  {
    value: ">",
    label: ">",
    supported:['number','date']
  },
  {
    value: "<=",
    label: "<=",
    supported:['number','date']
  },
  {
    value: ">=",
    label: ">=",
    supported:['number','date']
  },
  {
    value: "like",
    label: "like",
    supported:['text']
  },
  {
    value: "in",
    label: "in",
    supported:['text','number','date','boolean']
  },
  {
    value: "isNull",
    label: "Is Null",
    supported:['text','number','date','boolean']
  },
  {
    value: "between",
    label: "Between",
    supported:['date']
  },
];

export const getSupoortedOperators = (dataType) => {
  const supportedDataType  = OperatorData.filter((item) => item.supported.includes(dataType));
  return supportedDataType  || OperatorData
}

export const whereConditionOperator = [
  {
    value: "and",
    label: "and",
  },
  {
    value: "or",
    label: "or",
  },
];

export const dateTypeOptionsData = [
  {
    value: "last_30_Days",
    label: "last 30 Days",
    type:'text'
  },
  {
    value: "last_7_Days",
    label: "last 7 Days",
    type:'text'
  },
  {
    value: "last_3_Days",
    label: "last 3 Days",
    type:'text'
  },
  {
    value: "last_2_Days",
    label: "last 2 Days",
    type:'text'
  },
  {
    value: "last_24_Hours",
    label: "last 24 Hours",
    type:'text'
  },
  {
    value: "last_12_Hours",
    label: "last 12 Hours",
    type:'text'
  },
  {
    value: "last_1_Hours",
    label: "last 1 Hours",
    type:'text'
  },
  {
    value: "choose_manually",
    label: "Choose Manually",
    type:'date'
  }
]

export const booleanOptionsData = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];

export const requiredErrorMessage = 'This is Required';

export const selectFieldAllFieldData = [{
  value: 'select_all',
  label: 'All Fields',
  dataType: 'all_in',
  disabled: false,
}]

export const OrderByOptionsData = [
  {
    value: "ASC",
    label: "ASC",
  },
  {
    value: "DESC",
    label: "DESC",
  }
]