import instance from "../api";

const removeWalk = (id) => {
  return instance.delete(`walking/${id}`);
};

export default removeWalk;
