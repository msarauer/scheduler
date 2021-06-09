import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {days, day, setDay} = props;
  
  const schedule = days.map(item => {
 
    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === day}
        setDay={setDay}
        
      />
    )
  })
  return <ul>{schedule}</ul>
}


// Props
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"