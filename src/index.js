import React from 'react';
import ReactDOM from 'react-dom';
import QueryBuilder from "./QueryBuilder";
console.log('model 1111',555555555555)
const RetoolConnectedComponent = Retool.connectReactComponent(QueryBuilder);
document.body.setAttribute('style', 'margin: 0;') 
ReactDOM.render(
  <RetoolConnectedComponent/>, 
  document.body.appendChild(document.createElement('div')) 
);