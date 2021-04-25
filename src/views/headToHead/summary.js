import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  SlideFade,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Summary = ({ cardBg, raceId, driver1, driver2, drivers, fetching, year }) => {
  const [fastest1, setFastest1] = useState();
  const [fastest2, setFastest2] = useState();
  const tableColor = useColorModeValue("blackAlpha", "whiteAlpha");
  const [isSmall] = useMediaQuery("(min-width: 400px)");

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

    // return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const dif = (time1, time2) => {
    const beforeDif = (time1 - time2) / 1000;
    const dif = beforeDif ? beforeDif.toFixed(3) : "";
    if (dif > 0) return `+${dif}`;
    else return dif;
  };

  const getFastest = async (driverId, set) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/laptimes/summary/${raceId}/${driverId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
          },
        }
      )
      .then((res) => {
        const data = res.data[0];
        set(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFastestOld = async (driverId, set) => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/laptimes/summary/old/${raceId}/${driverId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
          },
        }
      )
      .then((res) => {
        const data = res.data[0];
        set(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (year > 2011) {
      getFastest(driver1, setFastest1);
      getFastest(driver2, setFastest2);
    } else {
      getFastestOld(driver1, setFastest1);
      getFastestOld(driver2, setFastest2);
    }
    // eslint-disable-next-line
  }, [driver1, driver2]);

  return (
    <Flex
      align="center"
      mb={4}
      bg={cardBg}
      borderRadius="lg"
      direction="column"
      justifyContent="center"
      p="4"
      overflow="auto"
      minH="150px"
      flexGrow={["1", "0.5"]}>
      {fastest1 && fastest2 ? (
        <SlideFade in={!fetching}>
          <Table size="sm" colorScheme={tableColor}>
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
                    dif(fastest1.fastLap, fastest2.fastLap) < 0 ? "green.500" : "red.500"
                  }>
                  {fastest1?.fastestLapString}
                </Td>
                <Td
                  fontWeight="semibold"
                  color={
                    dif(fastest1.fastLap, fastest2.fastLap) > 0 ? "green.500" : "red.500"
                  }>
                  {fastest2?.fastestLapString}
                </Td>
                <Td
                  pl={isSmall ? 4 : 0}
                  fontWeight="semibold"
                  textAlign="right"
                  color={
                    dif(fastest1.fastLap, fastest2.fastLap) < 0 ? "green.500" : "red.500"
                  }>
                  {dif(fastest1.fastLap, fastest2.fastLap)}
                </Td>
              </Tr>
              <Tr>
                <Td pr={0}>Avg. Pace</Td>
                <Td
                  fontWeight="semibold"
                  pr={isSmall ? 4 : 0}
                  color={
                    dif(fastest1.avgPace, fastest2.avgPace) < 0 ? "green.500" : "red.500"
                  }>
                  {convertTime(fastest1.avgPace)}
                </Td>
                <Td
                  fontWeight="semibold"
                  color={
                    dif(fastest1.avgPace, fastest2.avgPace) > 0 ? "green.500" : "red.500"
                  }>
                  {convertTime(fastest2.avgPace)}
                </Td>
                <Td
                  pl={isSmall ? 4 : 0}
                  fontWeight="semibold"
                  textAlign="right"
                  color={
                    dif(fastest1.avgPace, fastest2.avgPace) < 0 ? "green.500" : "red.500"
                  }>
                  {dif(fastest1.avgPace, fastest2.avgPace)}
                </Td>
              </Tr>
              <Tr>
                <Td pr={0}>Slowest Lap</Td>
                <Td
                  fontWeight="semibold"
                  pr={isSmall ? 4 : 0}
                  color={
                    dif(fastest1.slowestLap, fastest2.slowestLap) < 0
                      ? "green.500"
                      : "red.500"
                  }>
                  {convertTime(fastest1.slowestLap)}
                </Td>
                <Td
                  fontWeight="semibold"
                  color={
                    dif(fastest1.slowestLap, fastest2.slowestLap) > 0
                      ? "green.500"
                      : "red.500"
                  }>
                  {convertTime(fastest2.slowestLap)}
                </Td>
                <Td
                  pl={isSmall ? 4 : 0}
                  fontWeight="semibold"
                  textAlign="right"
                  color={
                    dif(fastest1.slowestLap, fastest2.slowestLap) < 0
                      ? "green.500"
                      : "red.500"
                  }>
                  {dif(fastest1.slowestLap, fastest2.slowestLap)}
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
                        fastest1.pitStops !== fastest2.pitStops
                          ? fastest1.pitStops - fastest2.pitStops < 0
                            ? "green.500"
                            : "red.500"
                          : "yellow.500"
                      }>
                      {fastest1.pitStops}
                    </Td>
                    <Td
                      fontWeight="semibold"
                      color={
                        fastest1.pitStops !== fastest2.pitStops
                          ? fastest1.pitStops - fastest2.pitStops > 0
                            ? "green.500"
                            : "red.500"
                          : "yellow.500"
                      }>
                      {fastest2.pitStops}
                    </Td>
                    <Td
                      pl={isSmall ? 4 : 0}
                      fontWeight="semibold"
                      textAlign="right"
                      color={
                        fastest1.pitStops !== fastest2.pitStops
                          ? fastest1.pitStops - fastest2.pitStops < 0
                            ? "green.500"
                            : "red.500"
                          : "yellow.500"
                      }>
                      {fastest1.pitStops - fastest2.pitStops}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td pr={0}>Avg. Pit Stop</Td>
                    <Td
                      fontWeight="semibold"
                      pr={isSmall ? 4 : 0}
                      color={
                        dif(fastest1.avgPit, fastest2.avgPit) < 0
                          ? "green.500"
                          : "red.500"
                      }>
                      {convertTime(fastest1.avgPit)}
                    </Td>
                    <Td
                      fontWeight="semibold"
                      color={
                        dif(fastest1.avgPit, fastest2.avgPit) > 0
                          ? "green.500"
                          : "red.500"
                      }>
                      {convertTime(fastest2.avgPit)}
                    </Td>
                    <Td
                      pl={isSmall ? 4 : 0}
                      fontWeight="semibold"
                      textAlign="right"
                      color={
                        dif(fastest1.avgPit, fastest2.avgPit) < 0
                          ? "green.500"
                          : "red.500"
                      }>
                      {dif(fastest1.avgPit, fastest2.avgPit)}
                    </Td>
                  </Tr>
                </>
              ) : null}
            </Tbody>
          </Table>
        </SlideFade>
      ) : null}
    </Flex>
  );
};

export default Summary;
