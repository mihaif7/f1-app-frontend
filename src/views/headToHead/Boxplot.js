import { Box, useColorMode } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { interquartileRange, max, mean, median, min, quantile } from "simple-statistics";
import {
  VictoryAxis,
  VictoryBoxPlot,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
} from "victory";

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
const convertTime = (millis) => {
  if (millis === null) return "-";

  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt((millis % 60000) / 1000);
  const milliseconds = parseInt(millis % 1000);

  return (
    (minutes !== 0 ? minutes + ":" : "") +
    (seconds < 10 ? "0" : "") +
    seconds +
    "." +
    (milliseconds < 10 ? "00" : milliseconds < 100 ? "0" : "") +
    milliseconds
  );
};

// dataset Creater
const createBoxPlot = (lapTimes) => {
  // keep only laptimes in milliseconds
  const onlyMili = lapTimes.map((value) => value.milliseconds).sort((a, b) => a - b);

  if (onlyMili.length < 5) return;

  // remove anomalies
  const delimitQ1 = quantile(onlyMili, 0.25) - 1.5 * interquartileRange(onlyMili);
  const delimitQ3 = quantile(onlyMili, 0.75) + 1.5 * interquartileRange(onlyMili);

  // creating dataset
  const boxLap = {
    min: delimitQ1 > min(onlyMili) ? delimitQ1 : min(onlyMili),
    max: delimitQ3 < max(onlyMili) ? delimitQ3 : max(onlyMili),
    mean: mean(onlyMili),
    median: median(onlyMili),
    iqr: interquartileRange(onlyMili),
    firstQuartile: quantile(onlyMili, 0.25),
    thirdQuartile: quantile(onlyMili, 0.75),
    outliers: onlyMili.filter(
      (value) =>
        (value < delimitQ1 && value > delimitQ1 * 2) ||
        (value > delimitQ3 && value < delimitQ3 * 2)
    ),
  };

  return boxLap;
};

const Boxplot = ({ lapTimes1, lapTimes2, driver1, driver2, drivers }) => {
  const { colorMode } = useColorMode();
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });
  const graphRef = useCallback((node) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const boxLap1 = createBoxPlot(lapTimes1);
  const boxLap2 = createBoxPlot(lapTimes2);

  let data = [];

  if (boxLap2) {
    data.push({
      x: findDriver(driver2, drivers),
      min: boxLap2.min,
      median: boxLap2.median,
      max: boxLap2.max,
      q1: boxLap2.firstQuartile,
      q3: boxLap2.thirdQuartile,
    });
  }
  if (boxLap1) {
    data.push({
      x: findDriver(driver1, drivers),
      min: boxLap1.min,
      median: boxLap1.median,
      max: boxLap1.max,
      q1: boxLap1.firstQuartile,
      q3: boxLap1.thirdQuartile,
    });
  }

  return (
    <Box h="100%" w="100%" ref={graphRef}>
      <VictoryChart
        domainPadding={{ x: 90, y: 40 }}
        padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
        animate={{ duration: 500 }}
        height={400}
        width={boundingRect.width}
        containerComponent={
          <VictoryContainer
            style={{
              pointerEvents: "auto",
              userSelect: "auto",
              touchAction: "auto",
              height: 400,
            }}
          />
        }>
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => convertTime(x)}
          style={{
            grid: { stroke: "#718096", strokeDasharray: "2 10" },
            axis: { stroke: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
            tickLabels: { fill: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
          }}
          fixLabelOverlap={true}
        />
        <VictoryAxis
          style={{
            grid: { stroke: "#718096", strokeDasharray: "2 10" },
            axis: { stroke: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
            tickLabels: { fill: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
          }}
        />
        <VictoryBoxPlot
          horizontal
          boxWidth={20}
          style={{
            min: { stroke: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
            max: { stroke: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
            q1: { fill: "#2F9A2E" },
            q3: { fill: "#2F9A2E" },
            median: {
              stroke: colorMode === "light" ? "#1a202c" : "#ffffffeb",
              strokeWidth: 2,
            },
            minLabels: { fill: colorMode === "light" ? "#C330EF" : "#DC31FF" },
            maxLabels: { fill: colorMode === "light" ? "#A48B01" : "#D8B602" },
            medianLabels: { fill: colorMode === "light" ? "#1a202c" : "#ffffffeb" },
          }}
          data={data}
          maxLabels={({ datum }) => convertTime(datum.max)}
          minLabels={({ datum }) => convertTime(datum.min)}
          medianLabels={({ datum }) => convertTime(datum.median)}
          medianLabelComponent={<VictoryLabel dy={30} />}
        />
      </VictoryChart>
    </Box>
  );
};

export default Boxplot;
