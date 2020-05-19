import React from "react";
import Feed from "./Feed/Feed";
import Chart from "./Chart/Chart";

const App = () => {
  return (
    <>
      <div className="header">
        {" "}
        <h1>Шагомер на тестовое задание</h1>
      </div>
      <div className="body">
        <Feed />
        <Chart />
      </div>
    </>
  );
};

export default App;
