import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import s from "./Chart.module.css";
import { useSelector } from "react-redux";
import Window from "./Window/Window";
import { compareAsc, format } from "date-fns";

const Chart = () => {
  const walking = useSelector((state) => state.user.walking);
  walking.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  const data = walking.map((item) => {
    const date = item.date;
    const datePars = format(new Date(date), "dd.MM.yyyy");

    return {
      name: datePars,
      uv: item.distance,
    };
  });

  const findMinDistance = () => {
    if (walking[0]) {
      let minDistance = walking[0].distance;
      walking.forEach(
        (item) => item.distance < minDistance && (minDistance = item.distance)
      );
      return minDistance;
    }
  };

  const findMaxDistance = () => {
    if (walking[0]) {
      let maxDistance = 0;
      walking.forEach(
        (item) => item.distance > maxDistance && (maxDistance = item.distance)
      );
      return maxDistance;
    }
  };

  const sumDistance = () => {
    if (walking[0]) {
      return walking.reduce((sum, item) => sum + item.distance, 0);
    }
  };

  const determineInterval = () => {
    let furtherDate = new Date();
    let nearestDate = 0;

    if (walking[0]) {
      for (let i = 0; i < walking.length; i++) {
        compareAsc(new Date(walking[i].date), new Date(nearestDate)) &&
          (nearestDate = walking[i].date);
        compareAsc(new Date(walking[i].date), new Date(furtherDate)) < 0 &&
          (furtherDate = walking[i].date);
      }
    }

    return {
      furtherDate: format(new Date(furtherDate), "dd.MM.yyyy"),
      nearestDate: format(new Date(nearestDate), "dd.MM.yyyy"),
    };
  };

  const CustomTooltip = ({ active, payload, label }) => {
    const date = label;
    let distance;
    if (payload[0]) {
      distance = payload[0].value;
    }
    if (active) {
      return <Window date={date} distance={distance} />;
    }
    return null;
  };

  return (
    <div className={s.chart}>
      <h2 className={s.chart_header}>Суммарная активность</h2>
      <div className={s.chart_body}>
        <LineChart
          width={800}
          height={300}
          data={[{ name: 0, uv: 0 }, ...data]}
          margin={{ top: 5, right: 50, bottom: 5, left: 0 }}
          style={{ marginTop: "100px" }}
        >
          <Line type="linear" dataKey="uv" stroke="red" />
          <CartesianGrid stroke="#ccc" strokeDasharray="solid" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </div>
      <div className={s.chart_after}>
        <p className={s.distance}>{`Минимум: ${findMinDistance()}`}</p>
        <p className={s.distance}>{`Максимум: ${findMaxDistance()}`}</p>
        <div className={s.distanceSum}>
          <p className={s.distanceSum_p}>
            {`Суммарно с ${determineInterval().furtherDate} по ${
              determineInterval().nearestDate
            }:`}
          </p>
          <p>{sumDistance()}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;
