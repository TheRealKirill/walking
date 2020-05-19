import React, { useState } from "react";
import s from "./ItemFeed.module.css";
import Options from "./Options";
import { format } from "date-fns";

const day = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};

const ItemFeed = (props) => {
  const [options, setOptions] = useState(false);

  const date = format(new Date(props.date), "dd.MM.yyyy");

  const kilometrs = Math.floor(props.distance / 1000);
  const distance = kilometrs
    ? `${kilometrs} км ${props.distance % 1000} м`
    : `${props.distance} м`;

  return (
    <>
      {options ? (
        <Options
          setOptions={setOptions}
          distance={props.distance}
          id={props.id}
        />
      ) : (
        <div
          className={s.item}
          style={{ background: props.color ? "grey" : "white" }}
          onClick={() => {
            setOptions(true);
          }}
        >
          <div>
            <p className={s.item_day}>{day[new Date(props.date).getDay()]}</p>
            <div className={s.item_date}>{date}</div>
          </div>
          <div style={{ cursor: "default" }}>{distance}</div>
        </div>
      )}
    </>
  );
};

export default ItemFeed;
