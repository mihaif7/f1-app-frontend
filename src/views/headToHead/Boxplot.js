import { Group } from "@visx/group";
import { getRandomNormal, getSeededRandom } from "@visx/mock-data";
import genStats from "@visx/mock-data/lib/generators/genStats";
import { PatternLines } from "@visx/pattern";
import { scaleBand, scaleLinear, scaleLog } from "@visx/scale";
import { BoxPlot, ViolinPlot } from "@visx/stats";
import { min, max, mean, median, interquartileRange, quantile } from "simple-statistics";
import {
  defaultStyles as defaultTooltipStyles,
  Tooltip,
  withTooltip,
} from "@visx/tooltip";
import React from "react";

// seeded randomness
const seededRandom = getSeededRandom(0.1);
const randomNormal = getRandomNormal.source(getSeededRandom(0.789))(4, 3);
const data = genStats(2, randomNormal, () => 10 * seededRandom());

// // accessors
const x = (d) => d.boxPlot.x;
// const min = (d) => d.boxPlot.min;
// const max = (d) => d.boxPlot.max;
// const median = (d) => d.boxPlot.median;
// const firstQuartile = (d) => d.boxPlot.firstQuartile;
// const thirdQuartile = (d) => d.boxPlot.thirdQuartile;
// const outliers = (d) => d.boxPlot.outliers;

const convertTime = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  const milliseconds = (millis % 1000).toFixed(0);

  return (
    (minutes !== 0 ? minutes + ":" : "") +
    (seconds < 10 ? "0" : "") +
    seconds +
    ":" +
    (milliseconds < 10 ? "00" : milliseconds < 100 ? "0" : "") +
    milliseconds
  );
};

export default withTooltip(
  ({
    width,
    height,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
    lapTimes1,
    lapTimes2,
  }) => {
    const onlyMili1 = lapTimes1.map((value) => value.milliseconds).sort((a, b) => a - b);
    const onlyMili2 = lapTimes2.map((value) => value.milliseconds).sort((a, b) => a - b);

    // console.log(violin);

    const boxLap1 = {
      min: quantile(onlyMili1, 0.1),
      max: quantile(onlyMili1, 0.9),
      mean: mean(onlyMili1),
      median: median(onlyMili1),
      iqr: interquartileRange(onlyMili1),
      firstQuartile: quantile(onlyMili1, 0.25),
      thirdQuartile: quantile(onlyMili1, 0.75),
    };

    const boxLap2 = {
      min: quantile(onlyMili2, 0.1),
      max: quantile(onlyMili2, 0.9),
      mean: mean(onlyMili2),
      median: median(onlyMili2),
      iqr: interquartileRange(onlyMili2),
      firstQuartile: quantile(onlyMili2, 0.25),
      thirdQuartile: quantile(onlyMili2, 0.75),
    };

    console.log(boxLap1, boxLap2);
    console.log(`Driver 1:
      min: ${convertTime(quantile(onlyMili1, 0.1))}
      max: ${convertTime(quantile(onlyMili1, 0.9))}
      mean: ${convertTime(mean(onlyMili1))}
      median: ${convertTime(median(onlyMili1))}
      iqr: ${convertTime(interquartileRange(onlyMili1))}
      quartile: ${quantile(onlyMili1, [0.25, 0.75]).map((value) => convertTime(value))}

Driver 2:
      min: ${convertTime(quantile(onlyMili2, 0.1))}
      max: ${convertTime(quantile(onlyMili2, 0.9))}
      mean: ${convertTime(mean(onlyMili2))}
      median: ${convertTime(median(onlyMili2))}
      iqr: ${convertTime(interquartileRange(onlyMili2))}
      quartile: ${quantile(onlyMili2, [0.25, 0.75]).map((value) => convertTime(value))}
    `);

    // bounds
    const xMax = width;
    const yMax = height - 120;

    // scales
    const xScale1 = scaleBand({
      range: [0, xMax],
      round: true,
      domain: "Driver 1",
      padding: 0.4,
    });

    const xScale2 = scaleBand({
      range: [0, xMax],
      round: true,
      domain: "Driver 2",
      padding: 0.4,
    });

    // const values = data.reduce((allValues, { boxPlot }) => {
    //   //   console.log(allValues, boxPlot);
    //   allValues.push(boxPlot.min, boxPlot.max);
    //   return allValues;
    // }, []);
    // const minYValue = Math.min(...values);
    // const maxYValue = Math.max(...values);

    const yScale = scaleLog({
      range: [yMax, 120],
      round: true,
      domain: [
        boxLap1.min < boxLap2.minx ? boxLap1.min : boxLap2.min,
        boxLap1.max > boxLap1.max ? boxLap1.max : boxLap2.max,
      ],
    });

    const boxWidth1 = xScale1.bandwidth();
    const constrainedWidth1 = Math.min(80, boxWidth1);

    const boxWidth2 = xScale2.bandwidth();
    const constrainedWidth2 = Math.min(80, boxWidth2);

    return width < 10 ? null : (
      <div style={{ position: "relative" }}>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#statsplot)"
            rx={14}
          />
          <PatternLines
            id="hViolinLines"
            height={3}
            width={3}
            stroke="#ced4da"
            strokeWidth={1}
            fill="rgba(0,0,0,0.3)"
            orientation={["horizontal"]}
          />
          <Group top={40}>
            <g>
              {/* <ViolinPlot
                data={violin}
                stroke="#dee2e6"
                left={100}
                width={constrainedWidth}
                valueScale={yScale}
                fill="url(#hViolinLines)"
              /> */}
              <BoxPlot
                min={boxLap1.min}
                max={boxLap1.max}
                firstQuartile={boxLap1.firstQuartile}
                thirdQuartile={boxLap1.thirdQuartile}
                median={boxLap1.median}
                boxWidth={constrainedWidth1 * 0.4}
                fill="black"
                fillOpacity={0.3}
                stroke="black"
                strokeWidth={2}
                valueScale={yScale}
                left={100}
              />

              <BoxPlot
                min={boxLap2.min}
                max={boxLap2.max}
                firstQuartile={boxLap2.firstQuartile}
                thirdQuartile={boxLap2.thirdQuartile}
                median={boxLap2.median}
                boxWidth={constrainedWidth2 * 0.4}
                fill="black"
                fillOpacity={0.3}
                stroke="black"
                strokeWidth={2}
                valueScale={yScale}
                left={400}
              />
            </g>
          </Group>
        </svg>
      </div>
    );
  }
);
