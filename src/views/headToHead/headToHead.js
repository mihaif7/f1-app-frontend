import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  Select,
  Skeleton,
  SlideFade,
  Stack,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Tilt from "react-tilt";
import { colorHtHSelect } from "../../utils/colorLabels";
import "./../team-colors.scss";
import Boxplot from "./Boxplot";
import HthTable from "./hthTable";
import LineChartComponent from "./LineChart";
import Summary from "./summary";

const lightGradient = {
  normal: "linear(315deg, #FDB4C7 0%, #FFECD3 95%)",
  hover: "linear(315deg, #fdbccd 0%, #ffeed7 95%)",
  active: "linear(315deg, #e4a2b3 0%, #e6d4be 95%)",
};

const darkGradient = {
  normal: "linear(315deg, #861657 0%, #ffa69e 95%)",
  hover: "linear(315deg, #6b1246 0%, #cc857e 95%)",
  active: "linear(315deg, #500d34 0%, #99645f 95%)",
};

const HeadToHead = () => {
  const [raceInfo, setRaceInfo] = useState();
  const [drivers, setDrivers] = useState();
  const [driver1, setDriver1] = useState();
  const [driver2, setDriver2] = useState();
  const [lapTimes1, setLapTimes1] = useState();
  const [lapTimes2, setLapTimes2] = useState();
  const [fetching, setFetching] = useState(false);
  const [stackChange] = useMediaQuery("(min-width: 1270px)");
  let { year, raceId } = useParams();
  const { colorMode } = useColorMode();

  const cardBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const orange = useColorModeValue("orange.100", "yellow.800");
  const smallText = useColorModeValue("gray.600", "whiteAlpha.600");
  const button = useColorModeValue("blackAlpha", "gray");

  const handleChange = (event) => {
    setFetching(true);
    const driverID = parseInt(event.target.value);
    setDriver1(driverID);
    getLapTimes(driverID, 1);
  };

  const handleChange2 = (event) => {
    setFetching(true);
    const driverID = parseInt(event.target.value);
    setDriver2(driverID);
    getLapTimes(driverID, 2);
  };

  const getCircuitInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/circuit/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        },
      })
      .then((res) => {
        const newObject = res.data;
        setRaceInfo(newObject[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDrivers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/drivers/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        },
      })
      .then((res) => {
        const newObject = res.data;
        setDriver1(newObject[0].driverId);
        getLapTimes(newObject[0].driverId, 1);
        setDriver2(newObject[1].driverId);
        getLapTimes(newObject[1].driverId, 2);
        setDrivers(newObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLapTimes = async (driverId, select) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/laptimes/${raceId}/${driverId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        },
      })
      .then((res) => {
        const data = res.data;
        if (select === 1) setLapTimes1(data);
        if (select === 2) setLapTimes2(data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swapDrivers = () => {
    const d1 = driver1;
    const d2 = driver2;
    setDriver1(d2);
    setDriver2(d1);

    const l1 = lapTimes1;
    const l2 = lapTimes2;

    setLapTimes1(l2);
    setLapTimes2(l1);
  };

  useEffect(() => {
    getCircuitInfo();
    getDrivers();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [raceId, year]);

  return drivers && driver1 && driver2 && lapTimes1 && lapTimes2 ? (
    <SlideFade in={true}>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        <Stack
          width={["91vw", "80vw", "80vw", "80vw", "80vw"]}
          direction="column"
          spacing={["4", "6"]}
          justifyContent="center"
          my={4}>
          <Stack direction={stackChange ? "row" : "column"} spacing={["4", "6"]}>
            <Stack spacing={["4", "6"]} flex="1 1 50%">
              <Tilt
                className="Tilt"
                style={{ flex: "1 1 33%" }}
                options={{
                  reverse: true, // reverse the tilt direction
                  max: 5, // max tilt rotation (degrees)
                  perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
                  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
                  speed: 300, // Speed of the enter/exit transition
                  transition: true, // Set a transition on enter/exit.
                  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
                }}>
                <a href={raceInfo.raceUrl} target="_blank" rel="noreferrer">
                  <Flex
                    align="center"
                    bgGradient={
                      colorMode === "light" ? lightGradient.normal : darkGradient.normal
                    }
                    _hover={{
                      bgGradient:
                        colorMode === "light" ? lightGradient.hover : darkGradient.hover,
                    }}
                    _active={{
                      bgGradient:
                        colorMode === "light"
                          ? lightGradient.active
                          : darkGradient.active,
                    }}
                    borderRadius="3xl"
                    flex="1 1 50%"
                    boxShadow={["md", "lg"]}>
                    <Box
                      p="6"
                      d="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w="100%">
                      <Box
                        color={smallText}
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        mb={2}>
                        Race {raceInfo.round}
                      </Box>
                      <Box
                        fontWeight="semibold"
                        fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                        lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                        as="p">
                        {raceInfo.raceName}
                      </Box>
                      <Box
                        color={smallText}
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        mt={2}>
                        Date: {raceInfo.date}
                      </Box>
                    </Box>
                  </Flex>
                </a>
              </Tilt>
              {!stackChange && (
                <Flex
                  justifyContent="center"
                  bg={cardBg}
                  borderRadius="3xl"
                  direction="column"
                  h="133px"
                  boxShadow={["md", "lg"]}>
                  <Box p="4" d="flex" flexDirection="column" w="100%">
                    <Box d="flex">
                      <Select
                        value={driver1}
                        onChange={handleChange}
                        pr={1}
                        variant="filled"
                        rootProps={
                          year > 2013 && {
                            className:
                              "left-select " + colorHtHSelect(driver1, drivers, year),
                          }
                        }
                        fontWeight={500}
                        className={colorHtHSelect(driver1, drivers, year)}
                        bg={year <= 2013 && orange}
                        borderRadius="3xl">
                        {drivers.map((driver) => {
                          return (
                            <option
                              value={driver.driverId}
                              key={driver.driverId}
                              disabled={driver.driverId === driver2}
                              className={
                                (colorMode === "light"
                                  ? "drop-text-light"
                                  : "drop-text-dark") +
                                (driver.driverId === driver2 ? " disabled-option" : "")
                              }>
                              {year > 2013
                                ? `#${driver.number} ${driver.code}`
                                : driver.code ??
                                  driver.surname.substring(0, 3).toUpperCase()}
                            </option>
                          );
                        })}
                      </Select>
                      <Select
                        value={driver2}
                        onChange={handleChange2}
                        pl={1}
                        variant="filled"
                        rootProps={
                          year > 2013 && {
                            className:
                              "right-select " + colorHtHSelect(driver2, drivers, year),
                          }
                        }
                        fontWeight={500}
                        className={colorHtHSelect(driver2, drivers, year)}
                        bg={year <= 2013 && orange}
                        borderRadius="3xl">
                        {drivers.map((driver) => {
                          return (
                            <option
                              value={driver.driverId}
                              key={driver.driverId}
                              disabled={driver.driverId === driver1}
                              className={
                                (colorMode === "light"
                                  ? "drop-text-light"
                                  : "drop-text-dark") +
                                (driver.driverId === driver1 ? " disabled-option" : "")
                              }>
                              {year > 2013
                                ? `#${driver.number} ${driver.code}`
                                : driver.code ??
                                  driver.surname.substring(0, 3).toUpperCase()}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>

                    <Box
                      color={smallText}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="sm"
                      mt={4}
                      flexGrow="1">
                      <Button
                        onClick={swapDrivers}
                        size="sm"
                        w="100%"
                        colorScheme={button}
                        leftIcon={<RepeatIcon />}
                        borderRadius="3xl">
                        Swap drivers
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              )}

              <Box bg={cardBg} borderRadius="xl" boxShadow={["md", "lg"]}>
                <Fade in={!fetching}>
                  <HthTable
                    year={year}
                    drivers={drivers}
                    driver1={driver1}
                    driver2={driver2}
                    lapTimes1={lapTimes1}
                    lapTimes2={lapTimes2}
                  />
                </Fade>
              </Box>
            </Stack>
            <Stack direction={"column"} spacing={["4", "6"]} flex="1 1 50%">
              {stackChange && (
                <Flex
                  justifyContent="center"
                  bg={cardBg}
                  borderRadius="3xl"
                  direction="column"
                  h="133px"
                  boxShadow={["md", "lg"]}>
                  <Box p="4" d="flex" flexDirection="column" w="100%">
                    <Box d="flex">
                      <Select
                        value={driver1}
                        onChange={handleChange}
                        pr={1}
                        variant="filled"
                        rootProps={
                          year > 2013 && {
                            className:
                              "left-select " + colorHtHSelect(driver1, drivers, year),
                          }
                        }
                        fontWeight={500}
                        className={colorHtHSelect(driver1, drivers, year)}
                        bg={year <= 2013 && orange}
                        borderRadius="3xl">
                        {drivers.map((driver) => {
                          return (
                            <option
                              value={driver.driverId}
                              key={driver.driverId}
                              disabled={driver.driverId === driver2}
                              className={
                                (colorMode === "light"
                                  ? "drop-text-light"
                                  : "drop-text-dark") +
                                (driver.driverId === driver2 ? " disabled-option" : "")
                              }>
                              {year > 2013
                                ? `#${driver.number} ${driver.code}`
                                : driver.code ??
                                  driver.surname.substring(0, 3).toUpperCase()}
                            </option>
                          );
                        })}
                      </Select>
                      <Select
                        value={driver2}
                        onChange={handleChange2}
                        pl={1}
                        variant="filled"
                        rootProps={
                          year > 2013 && {
                            className:
                              "right-select " + colorHtHSelect(driver2, drivers, year),
                          }
                        }
                        fontWeight={500}
                        className={colorHtHSelect(driver2, drivers, year)}
                        bg={year <= 2013 && orange}
                        borderRadius="3xl">
                        {drivers.map((driver) => {
                          return (
                            <option
                              value={driver.driverId}
                              key={driver.driverId}
                              disabled={driver.driverId === driver1}
                              className={
                                (colorMode === "light"
                                  ? "drop-text-light"
                                  : "drop-text-dark") +
                                (driver.driverId === driver1 ? " disabled-option" : "")
                              }>
                              {year > 2013
                                ? `#${driver.number} ${driver.code}`
                                : driver.code ??
                                  driver.surname.substring(0, 3).toUpperCase()}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>

                    <Box
                      color={smallText}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="sm"
                      mt={4}
                      flexGrow="1">
                      <Button
                        onClick={swapDrivers}
                        size="sm"
                        w="100%"
                        colorScheme={button}
                        leftIcon={<RepeatIcon />}
                        borderRadius="3xl">
                        Swap drivers
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              )}
              <Box>
                <Summary
                  cardBg={cardBg}
                  raceId={raceId}
                  driver1={driver1}
                  driver2={driver2}
                  drivers={drivers}
                  lapTimes1={lapTimes1}
                  lapTimes2={lapTimes2}
                  fetching={fetching}
                  year={year}
                />
              </Box>

              <Box bg={cardBg} borderRadius="xl" boxShadow={["md", "lg"]}>
                <Boxplot
                  lapTimes1={lapTimes1}
                  lapTimes2={lapTimes2}
                  driver1={driver1}
                  driver2={driver2}
                  drivers={drivers}
                />
              </Box>
              <Box
                bg={cardBg}
                borderRadius="xl"
                boxShadow={["md", "lg"]}
                h={["400px", "400px", "400px", "400px", "400px", "500px"]}
                width="99%">
                <LineChartComponent
                  lapTimes1={lapTimes1}
                  lapTimes2={lapTimes2}
                  driver1={driver1}
                  driver2={driver2}
                  drivers={drivers}
                  size={stackChange}
                />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </SlideFade>
  ) : (
    <>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        <Stack
          width={["91vw", "80vw", "80vw", "80vw", "80vw"]}
          direction="column"
          spacing={["4", "6"]}
          justifyContent="center"
          my={4}>
          <Stack direction={stackChange ? "row" : "column"} spacing={["4", "6"]}>
            <Stack spacing={["4", "6"]} flex="0 1 70%">
              <Skeleton height="120px" borderRadius="3xl" />
              {!stackChange && <Skeleton height="120px" borderRadius="3xl" />}
              <Skeleton
                height="700px"
                borderRadius="3xl"
                flex={stackChange && "1 1 65%"}
              />
            </Stack>
            <Stack
              direction={"column"}
              spacing={["4", "6"]}
              flex={stackChange && "1 1 35%"}>
              {stackChange && <Skeleton height="120px" borderRadius="3xl" />}
              <Skeleton height="222px" borderRadius="3xl" />
              <Skeleton height="271px" borderRadius="3xl" />
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default HeadToHead;
