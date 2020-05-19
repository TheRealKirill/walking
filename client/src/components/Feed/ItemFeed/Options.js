import React, { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Options.module.css";
import { removeWalk, setInfoUser, redactWalk } from "../../../lib/user";

const Options = (props) => {
  const dispatch = useDispatch();

  const [redact, setRedact] = useState(false);
  const [remove, setRemove] = useState(false);

  const [date, setDate] = useState("");
  const [distance, setDistance] = useState(props.distance);

  const [err, setErr] = useState(false);

  const changeDate = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const changeDistance = (event) => {
    const { value } = event.target;
    setDistance(value);
  };

  const removeElem = () => {
    removeWalk(props.id).then((res) => {
      dispatch(setInfoUser(res.data.walking));
    });
  };

  const redactElem = () => {
    redactWalk(props.id, date, distance).then(
      (res) => {
        if (err) setErr(false);
        dispatch(setInfoUser(res.data.walking));
        props.setOptions(false);
      },
      (error) => {
        setErr(true);
      }
    );
  };

  return (
    <div className={s.options}>
      <div>
        {redact ? (
          <>
            <div className={s.redact}>
              <input
                className={s.redact_date}
                type="date"
                value={date}
                onChange={changeDate}
              ></input>
              <input
                className={s.redact_distance}
                value={distance}
                onChange={changeDistance}
              ></input>
              <div className={s.redact_button} onClick={redactElem}>
                Ок
              </div>
            </div>
            {err && (
              <p className={s.error}>
                Укажите дату или введите расстояние в правильном формате (пр:
                1200)
              </p>
            )}
          </>
        ) : (
          <div
            className={s.options_redact}
            onClick={() => {
              setRedact(true);
            }}
          >
            Редактировать
          </div>
        )}
        {remove ? (
          <div className={s.remove}>
            <div
              className={s.remove_button}
              style={{ marginRight: "20px" }}
              onClick={removeElem}
            >
              Ок
            </div>
            <div
              className={s.remove_button}
              onClick={() => {
                setRemove(false);
              }}
            >
              Отмена
            </div>
          </div>
        ) : (
          <div
            className={s.options_remove}
            onClick={() => {
              setRemove(true);
            }}
          >
            Удалить
          </div>
        )}
      </div>
      <div
        className={s.options_back}
        onClick={
          redact || remove
            ? () => {
                setRedact(false);
                setRemove(false);
                console.log("+");
              }
            : () => {
                props.setOptions(false);
              }
        }
      ></div>
    </div>
  );
};

export default Options;
