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
import { RepeatIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colorHtHSelect } from "../../utils/colorLabels";
import "./../team-colors.scss";
import Boxplot from "./Boxplot";
import HthTable from "./hthTable";
import Summary from "./summary";

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

  console.log();

  return drivers && driver1 && driver2 && lapTimes1 && lapTimes2 ? (
    <SlideFade in={true}>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        <Stack
          width={["91vw", "80vw", "80vw", "80vw", "80vw"]}
          direction="column"
          spacing="4"
          justifyContent="center"
          my={4}>
          <Stack direction={["column", "column", "column", "row", "row"]} spacing="4">
            <Flex align="center" bg={cardBg} borderRadius="lg" flex="1 1 50%">
              <Box p="6" d="flex" flexDirection="column" justifyContent="center" w="100%">
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
            <Flex
              justifyContent="center"
              bg={cardBg}
              borderRadius="lg"
              direction="column"
              flex="1 1 50%">
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
                    bg={year <= 2013 && orange}>
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
                            : driver.code ?? driver.surname.substring(0, 3).toUpperCase()}
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
                    bg={year <= 2013 && orange}>
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
                            : driver.code ?? driver.surname.substring(0, 3).toUpperCase()}
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
                    leftIcon={<RepeatIcon />}>
                    Swap drivers
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Stack>

          <Stack direction={stackChange ? "row" : "column"} spacing="4">
            <Box bg={cardBg} borderRadius="lg" flex="0 1 70%">
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
            <Stack direction={"column"} spacing="4" flex="1 0 30%">
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

              <Flex align="center" bg={cardBg} borderRadius="lg" direction="column">
                <Boxplot
                  lapTimes1={lapTimes1}
                  lapTimes2={lapTimes2}
                  driver1={driver1}
                  driver2={driver2}
                  drivers={drivers}
                />
              </Flex>
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
          spacing="4"
          justifyContent="center"
          my={4}>
          <Stack direction={["column", "column", "column", "row", "row"]} spacing="4">
            <Skeleton height="120px" borderRadius="lg" flex="1 1 50%" />
            <Skeleton height="120px" borderRadius="lg" flex="1 1 50%" />
          </Stack>

          <Stack direction={stackChange ? "row" : "column"} spacing="4">
            <Skeleton height="700px" borderRadius="lg" flex={stackChange && "1 1 65%"} />
            <Stack direction={"column"} spacing="4" flex={stackChange && "1 1 35%"}>
              <Skeleton height="222px" borderRadius="lg" />
              <Skeleton height="271px" borderRadius="lg" />
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default HeadToHead;
