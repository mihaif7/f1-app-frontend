import {
  Fade,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { max, mean, median, min } from "simple-statistics";

const convertTime = (millis) => {
  if (millis === null) return "-";

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

const dif = (time1, time2) => {
  if (time1 === null || time2 === null) return "-";
  const beforeDif = (time1 - time2) / 1000;
  const dif = beforeDif ? beforeDif.toFixed(3) : "";
  if (dif > 0) return `+${dif}`;
  else return dif;
};

const process = (laptime) => {
  const onlyMili = laptime.map((value) => value.milliseconds);

  const processed = {
    fastestLap: min(onlyMili),
    mean: mean(onlyMili),
    median: median(onlyMili),
    slowestLap: max(onlyMili),
    pitStops: laptime.filter((value) => value.pitLap !== null).length,
  };

  return processed;
};

const Summary = ({
  cardBg,
  raceId,
  driver1,
  driver2,
  drivers,
  fetching,
  year,
  lapTimes1,
  lapTimes2,
}) => {
  const tableColor = useColorModeValue("blackAlpha", "gray");
  const [isSmall] = useMediaQuery("(min-width: 400px)");
  const [stats1, setStats1] = useState({
    fastestLap: null,
    mean: null,
    median: null,
    slowestLap: null,
    pitStops: null,
  });
  const [stats2, setStats2] = useState({
    fastestLap: null,
    mean: null,
    median: null,
    slowestLap: null,
    pitStops: null,
  });

  const [difference, setDifference] = useState({
    fastestLap: null,
    mean: null,
    median: null,
    slowestLap: null,
    pitStops: null,
  });

  const findDriver = (driverToFind) => {
    const found = drivers.find((driver) => driver.driverId === driverToFind);
    let toReturn;

    if (found.code !== null) {
      toReturn = found.code;
    } else {
      toReturn = found.surname.substring(0, 3).toUpperCase();
    }
    return toReturn;
  };

  useEffect(() => {
    if (lapTimes1.length !== 0) setStats1(process(lapTimes1));
    else
      setStats1({
        fastestLap: null,
        mean: null,
        median: null,
        slowestLap: null,
        pitStops: null,
      });
  }, [lapTimes1]);

  useEffect(() => {
    if (lapTimes2.length !== 0) setStats2(process(lapTimes2));
    else
      setStats2({
        fastestLap: null,
        mean: null,
        median: null,
        slowestLap: null,
        pitStops: null,
      });
  }, [lapTimes2]);

  useEffect(() => {
    setDifference({
      fastestLap: dif(stats1.fastestLap, stats2.fastestLap),
      mean: dif(stats1.mean, stats2.mean),
      median: dif(stats1.median, stats2.median),
      slowestLap: dif(stats1.slowestLap, stats2.slowestLap),
      pitStops:
        stats1.pitStops - stats2.pitStops > 0
          ? `+${stats1.pitStops - stats2.pitStops}`
          : stats1.pitStops - stats2.pitStops,
    });
  }, [stats1, stats2]);

  // return <></>;

  return (
    <Flex
      align="center"
      bg={cardBg}
      borderRadius="lg"
      direction="column"
      justifyContent="center"
      py={4}
      overflow="auto"
      minH="150px"
      flexGrow={["1", "0.5"]}
      boxShadow={["md", "lg"]}>
      <Fade in={!fetching} style={{ width: "100%" }}>
        <Table size="sm" variant="striped" colorScheme={tableColor}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>{findDriver(driver1)}</Th>
              <Th>{findDriver(driver2)}</Th>
              <Th textAlign="right">+/-</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td pr={0}>Fastest Lap</Td>
              <Td
                fontWeight="semibold"
                pr={isSmall ? 4 : 0}
                color={
                  difference.fastestLap !== "-" &&
                  (difference.fastestLap < 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats1.fastestLap)}
              </Td>
              <Td
                fontWeight="semibold"
                color={
                  difference.fastestLap !== "-" &&
                  (difference.fastestLap > 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats2.fastestLap)}
              </Td>
              <Td
                pl={isSmall ? 4 : 0}
                fontWeight="semibold"
                textAlign="right"
                color={
                  difference.fastestLap !== "-" &&
                  (difference.fastestLap < 0 ? "green.500" : "red.500")
                }>
                {difference.fastestLap}
              </Td>
            </Tr>
            <Tr>
              <Td pr={0}>Mean Pace</Td>
              <Td
                fontWeight="semibold"
                pr={isSmall ? 4 : 0}
                color={
                  difference.mean !== "-" &&
                  (difference.mean < 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats1.mean)}
              </Td>
              <Td
                fontWeight="semibold"
                color={
                  difference.mean !== "-" &&
                  (difference.mean > 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats2.mean)}
              </Td>
              <Td
                pl={isSmall ? 4 : 0}
                fontWeight="semibold"
                textAlign="right"
                color={
                  difference.mean !== "-" &&
                  (difference.mean < 0 ? "green.500" : "red.500")
                }>
                {difference.mean}
              </Td>
            </Tr>
            <Tr>
              <Td pr={0}>Median Pace</Td>
              <Td
                fontWeight="semibold"
                pr={isSmall ? 4 : 0}
                color={
                  difference.median !== "-" &&
                  (difference.median < 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats1.median)}
              </Td>
              <Td
                fontWeight="semibold"
                color={
                  difference.median !== "-" &&
                  (difference.median > 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats2.median)}
              </Td>
              <Td
                pl={isSmall ? 4 : 0}
                fontWeight="semibold"
                textAlign="right"
                color={
                  difference.median !== "-" &&
                  (difference.median < 0 ? "green.500" : "red.500")
                }>
                {difference.median}
              </Td>
            </Tr>
            <Tr>
              <Td pr={0}>Slowest Lap</Td>
              <Td
                fontWeight="semibold"
                pr={isSmall ? 4 : 0}
                color={
                  difference.slowestLap !== "-" &&
                  (difference.slowestLap < 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats1.slowestLap)}
              </Td>
              <Td
                fontWeight="semibold"
                color={
                  difference.slowestLap !== "-" &&
                  (difference.slowestLap > 0 ? "green.500" : "red.500")
                }>
                {convertTime(stats2.slowestLap)}
              </Td>
              <Td
                pl={isSmall ? 4 : 0}
                fontWeight="semibold"
                textAlign="right"
                color={
                  difference.slowestLap !== "-" &&
                  (difference.slowestLap < 0 ? "green.500" : "red.500")
                }>
                {difference.slowestLap}
              </Td>
            </Tr>

            {year > 2011 ? (
              <>
                <Tr>
                  <Td pr={0}>Pit Stops</Td>
                  <Td
                    fontWeight="semibold"
                    pr={isSmall ? 4 : 0}
                    color={
                      stats1.pitStops !== stats2.pitStops
                        ? difference.pitStops < 0
                          ? "green.500"
                          : "red.500"
                        : "yellow.500"
                    }>
                    {stats1.pitStops}
                  </Td>
                  <Td
                    fontWeight="semibold"
                    color={
                      stats1.pitStops !== stats2.pitStops
                        ? difference.pitStops > 0
                          ? "green.500"
                          : "red.500"
                        : "yellow.500"
                    }>
                    {stats2.pitStops}
                  </Td>
                  <Td
                    pl={isSmall ? 4 : 0}
                    fontWeight="semibold"
                    textAlign="right"
                    color={
                      stats1.pitStops !== stats2.pitStops
                        ? difference.pitStops < 0
                          ? "green.500"
                          : "red.500"
                        : "yellow.500"
                    }>
                    {difference.pitStops}
                  </Td>
                </Tr>
              </>
            ) : null}
          </Tbody>
        </Table>
      </Fade>
    </Flex>
  );
};

export default Summary;
