import instance from "../api";

const requestUserInfo = () => {
  return instance.get(`walking`);
};

export default requestUserInfo;
