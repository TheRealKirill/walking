import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Feed.module.css";
import Window from "./Window/Window";
import ItemFeed from "./ItemFeed/ItemFeed";
import { requestUserInfo, setInfoUser } from "../../lib/user";
import { compareAsc } from "date-fns";

const Feed = () => {
  const dispatch = useDispatch();
  const walking = useSelector((state) => state.user.walking);

  const [action, setAction] = useState(false);

  const [filterDate, setFilterDate] = useState(false);
  const [filterDistance, setFilterDistance] = useState(false);
  const [modifyWalking, setModifyWalking] = useState([]);

  useEffect(() => {
    setInfoUserThunk();
  }, []);

  const changeDate = () => {
    if (!filterDate) {
      setFilterDate(true);
      setFilterDistance(false);
      setModifyWalking(
        walking.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
      );
    }
  };

  const changeDistance = () => {
    if (!filterDistance) {
      setFilterDistance(true);
      setFilterDate(false);
      setModifyWalking(
        walking.sort((a, b) => {
          if (a.distance < b.distance) {
            return -1;
          }
          if (a.distance > b.distance) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  const setInfoUserThunk = async function () {
    try {
      const res = await requestUserInfo();
      dispatch(setInfoUser(res.data.walking));
    } catch {}
  };

  const createItemFeed = (arr) => {
    return arr.map((item, index) => (
      <ItemFeed
        key={item.id}
        id={item.id}
        color={index % 2 === 0 ? true : false}
        date={item.date}
        distance={item.distance}
      />
    ));
  };

  const open = () => {
    setAction(true);
  };

  return (
    <div className={s.feed}>
      <div className={s.header}>
        <div className={s.header_item}>
          <p style={{ cursor: "default" }}>Дата</p>{" "}
          <div
            className={s.header_item_button}
            style={{ opacity: filterDate && "0.6" }}
            onClick={changeDate}
          ></div>
        </div>
        <div className={s.header_item}>
          <p style={{ cursor: "default" }}>Дистанция</p>{" "}
          <div
            className={s.header_item_button}
            style={{ opacity: filterDistance && "0.6" }}
            onClick={changeDistance}
          ></div>
        </div>
      </div>
      <div className={s.body}>
        {" "}
        {filterDate || filterDistance
          ? createItemFeed(modifyWalking)
          : createItemFeed(walking)}
      </div>
      <div className={s.button} onClick={open}>
        Добавить запись
      </div>
      {action && <Window setAction={setAction} />}
    </div>
  );
};

export default Feed;
