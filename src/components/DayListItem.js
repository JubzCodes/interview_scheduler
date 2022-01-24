import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const { name, spots, selected, setDay } = props;
  const check = props.spots === 0;

  const formatSpots = () => {
    if (spots === 1) {
      return`${spots} spot remaining`;
    }
    if (spots === 0) {
      return `no spots remaining`;
    }
    return `${spots} spots remaining`;
  };


  const dayClass = classNames("day-list", {
    "day-list__item": props,
    "day-list__item--selected": selected,
    "day-list__item--full": check
  });


  return (
    <li className={dayClass} onClick={() => setDay(name)} selected={selected}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()} </h3>
    </li>
  );
}