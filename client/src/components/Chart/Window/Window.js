import React from "react";
import s from "./Window.module.css";

const day = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};

const Window = (props) => {
  const date = `${props.date}`.split(".");

  let parsDate;
  if (date[1]) {
    parsDate = [
      +date[2],
      +date[1][0] === 0 ? +date[1][1] - 1 : +date[1] - 1,
      +date[0][0] === 0 ? +date[0][1] : +date[0],
    ];
  }

  let dateVal;
  if (parsDate) {
    dateVal = day[new Date(parsDate[0], parsDate[1], parsDate[2]).getDay()];
  }

  return (
    <div className={s.window}>
      <p className={s.day}>{dateVal}</p>
      <p className={s.date}>{props.date}</p>
      <div className={s.distance}>{`${props.distance}М.`}</div>
      <div className={s.button}>Показать на карте</div>
    </div>
  );
};

export default Window;
