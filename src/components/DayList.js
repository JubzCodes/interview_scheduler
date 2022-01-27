import React from "react";
import DayListItem from "./DayListItem";
// import { useState } from "react";


export default function DayList(props) {

  
  const { value, days, onChange} = props;
  const items = days.map((item => 
  <DayListItem 
  key={item.id}
  name={item.name}
  spots={item.spots}
  selected={item.name === value}
  setDay={onChange} 
  
  />));
  
  return (
    <ul>
      { items } 
    </ul>
  )

}