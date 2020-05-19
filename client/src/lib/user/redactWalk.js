import instance from "../api";

const redactWalk = (id, date, distance) => {
  return instance.put(`walking/${id}`, { date, distance });
};

export default redactWalk;
