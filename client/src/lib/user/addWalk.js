import instance from "../api";

const addWalk = (date, distance) => {
  return instance.post(`walking/`, { date, distance });
};

export default addWalk;
