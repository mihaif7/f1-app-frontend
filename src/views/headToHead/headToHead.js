import { Box, Flex, Select, Skeleton, SlideFade } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HthTable from "./hthTable";

const HeadToHead = () => {
  const [raceInfo, setRaceInfo] = useState();
  const [drivers, setDrivers] = useState();
  const [driver1, setDriver1] = useState();
  const [driver2, setDriver2] = useState();
  const [lapTimes1, setLapTimes1] = useState();
  const [lapTimes2, setLapTimes2] = useState();
  const [fetching, setFetching] = useState(false);
  let { raceId } = useParams();

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

  useEffect(() => {
    getCircuitInfo();
    getDrivers();
    // eslint-disable-next-line
  }, []);

  return drivers && driver1 && driver2 && lapTimes1 && lapTimes2 ? (
    <SlideFade in={true}>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        <Flex align="center" mb={4} bg="gray.100" borderRadius="lg" flexGrow={1}>
          <Box p="6" d="flex" flexDirection="column" justifyContent="center" w="100%">
            <Box
              color="gray.600"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              mb={2}>
              Round {raceInfo.round}
            </Box>
            <Box
              fontWeight="semibold"
              fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
              lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
              as="p"
              color="gray.700">
              {raceInfo.raceName}
            </Box>
            <Box
              color="gray.600"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              // textTransform="uppercase"
              mt={2}>
              Date: {raceInfo.date}
            </Box>
          </Box>
        </Flex>

        <Flex
          align="center"
          mb={4}
          bg="gray.100"
          borderRadius="lg"
          direction="column"
          flexGrow={1}>
          <Box p="4" d="flex" flexDirection="column" justifyContent="center" w="100%">
            <Box
              color="gray.600"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="sm"
              // textTransform="uppercase"
              mb={4}>
              Select two drivers
            </Box>
            <Box d="flex">
              <Select
                value={driver1}
                onChange={handleChange}
                pr={1}
                variant="filled"
                bg="orange.100">
                {drivers.map((driver) => {
                  return (
                    <option
                      value={driver.driverId}
                      key={driver.driverId}
                      disabled={
                        driver.driverId === driver2
                      }>{`#${driver.number} ${driver.code}`}</option>
                  );
                })}
              </Select>
              <Select
                value={driver2}
                onChange={handleChange2}
                pl={1}
                variant="filled"
                bg="orange.100">
                {drivers.map((driver) => {
                  return (
                    <option
                      value={driver.driverId}
                      key={driver.driverId}
                      disabled={
                        driver.driverId === driver1
                      }>{`#${driver.number} ${driver.code}`}</option>
                  );
                })}
              </Select>
            </Box>
          </Box>
        </Flex>

        <Flex
          align="center"
          mb={4}
          bg="gray.100"
          borderRadius="lg"
          direction="column"
          flexGrow={1}>
          <SlideFade in={!fetching}>
            <HthTable
              drivers={drivers}
              driver1={driver1}
              driver2={driver2}
              lapTimes1={lapTimes1}
              lapTimes2={lapTimes2}
            />
          </SlideFade>
        </Flex>
      </Flex>
    </SlideFade>
  ) : (
    <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
      <Skeleton height="110px" borderRadius="lg" w="100%" mb={4} />
      <Skeleton height="110px" borderRadius="lg" w="100%" mb={4} />
      <Skeleton height="500px" borderRadius="lg" w="100%" mb={4} />
    </Flex>
  );
};

export default HeadToHead;
