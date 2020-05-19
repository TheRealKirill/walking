import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Window.module.css";
import { addWalk, setInfoUser } from "../../../lib/user";

const Window = (props) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");

  const changeDate = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const changeDistance = (event) => {
    const { value } = event.target;
    setDistance(value);
  };

  const addItem = () => {
    addWalk(date, distance).then((res) => {
      console.log(res);
      dispatch(setInfoUser(res.data.walking));
    });
    props.setAction(false);
  };

  const close = () => {
    props.setAction(false);
  };

  return (
    <div className={s.window}>
      <div className={s.window_header}>
        <p>Введите данные</p>
        <div className={s.window_header_button} onClick={close}></div>
      </div>
      <div className={s.window_body}>
        {" "}
        <input
          type="date"
          className={s.date}
          value={date}
          onChange={changeDate}
        ></input>
        <input
          className={s.distance}
          value={distance}
          value={distance}
          onChange={changeDistance}
        ></input>
      </div>
      <div className={s.window_button} onClick={addItem}>
        Добавить
      </div>
    </div>
  );
};
export default Window;
