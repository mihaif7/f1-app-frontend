import { useColorMode } from "@chakra-ui/react";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { max, quantile } from "simple-statistics";

//find Driver code/name
const findDriver = (driverToFind, drivers) => {
  const found = drivers.find((driver) => driver.driverId === driverToFind);
  let toReturn;

  if (found.code !== null) {
    toReturn = found.code;
  } else {
    toReturn = found.surname.substring(0, 3).toUpperCase();
  }

  return toReturn;
};

// helper fucntions
const convertTime = (millis, noSeconds) => {
  if (millis === null) return "-";

  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt((millis % 60000) / 1000);
  const milliseconds = parseInt(millis % 1000);

  return (
    (minutes !== 0 ? minutes + ":" : "") +
    (seconds < 10 ? "0" : "") +
    seconds +
    (!noSeconds
      ? "." + (milliseconds < 10 ? "00" : milliseconds < 100 ? "0" : "") + milliseconds
      : "")
  );
};

const calcMax = (arr) => {
  const onlyMili = arr.map((value) => value.milliseconds);
  const delimitQ3 = quantile(onlyMili, 0.9) * 1.25;
  const m = delimitQ3 < max(onlyMili) ? delimitQ3 : max(onlyMili);

  return m;
};

const LineChartComponent = ({
  lapTimes1,
  lapTimes2,
  driver1,
  driver2,
  drivers,
  size,
}) => {
  const { colorMode } = useColorMode();

  let data;
  if (lapTimes1.length > lapTimes2.length) {
    data = lapTimes1.map((l, index) => {
      return {
        lap: l?.lap,
        time1: l?.milliseconds,
        time2: lapTimes2[index]?.milliseconds,
      };
    });
  } else {
    data = lapTimes2.map((l, index) => {
      return {
        lap: l?.lap,
        time2: l?.milliseconds,
        time1: lapTimes1[index]?.milliseconds,
      };
    });
  }

  const d1 = findDriver(driver1, drivers);
  const d2 = findDriver(driver2, drivers);

  const maxY1 = calcMax(lapTimes1);
  const maxY2 = calcMax(lapTimes2);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 15,
          left: size ? 0 : 15,
          bottom: 10,
        }}>
        {colorMode === "light" && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey="lap" />
        <YAxis
          domain={["auto", () => (maxY1 > maxY2 ? maxY1 : maxY2)]}
          tickFormatter={(tick) => {
            return convertTime(tick, true);
          }}
          allowDataOverflow={true}
          hide={!size}
        />
        <Tooltip
          formatter={(value, name) => {
            let newName = "";
            switch (name) {
              case "time1":
                newName = d1;
                break;
              case "time2":
                newName = d2;
                break;
              default:
                break;
            }

            return [convertTime(value), newName];
          }}
        />
        <Legend
          formatter={(value) => {
            if (value === "time1") return d1;
            else if (value === "time2") return d2;
          }}
        />
        <Line
          type="monotone"
          dataKey="time1"
          stroke="#8884d8"
          dot={false}
          strokeWidth={2}
          isAnimationActive={true}
        />
        <Line
          type="monotone"
          dataKey="time2"
          stroke="#82ca9d"
          dot={false}
          strokeWidth={2}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChartComponent);
