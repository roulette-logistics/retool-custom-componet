import Button from "@mui/material/Button";
import styled from "styled-components";
import { styled as MuiStyled} from '@mui/system';

export const CTAButton = MuiStyled(Button)`
  color: #3054B9;
  text-transform: none;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Inter';
  &:hover {
    /* Add hover styles here if needed */
  }
`;

export const WhereConditionWrapper = styled.div`
  width: 100%;
`;

export const QueryBuilderWrapper = styled.div`
  display: flex;
  height: 100%;
  // justify-content: flex-start;
`;


export const SelectFieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    align-items: center;
`;

export const DeleteIconWrapper = styled.div`
  flex-basis: 5%;
  right: 0;
`;


export const ColumnSelectionWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
  border: 1px solid #d0d5dd;
  align-items: center;
  background-color: #fcfcfd;
  border-radius: 12px;
  padding: 16px;
  width: 94%;
  gap: 15px;
`;

export const FieldSelectorParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const OperatorWrapper = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding-left: 5px;
`;


export const FieldSelection = styled.div`
  width: 90px;
  margin-top: 12px;
  margin-bottom: 2px;
`;


export const ColumnSelectionWrapperWhere = styled.div`
  display: flex;
  margin-top: 12px;
  flex-direction: row;
  border: 1px solid #d0d5dd;
  align-items: center;
  background-color: #fcfcfd;
  border-radius: 4px;
  padding: 16px;
  width: 99%;
  gap: 5px;
`;

export const WholeWrapper = styled.div`
  width: 97%;
`

export const SelectComponentWrapper = styled.div`
  flex-basis: 30%;
`

export const SelectComponentOperatorWrapper = styled.div`
  flex-basis: 20%;
`
export const DeleteIconWrapperWhereCondition = styled.div`
  flex-basis: 10%;
  display: flex;
  justify-content: center;
  right: 0;
`

export const BetweenDateComponentWrapper = styled.div`
display: flex;
gap: 10px;
`