import { Box, Flex, Select, SlideFade } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HeadToHead = () => {
  const [raceInfo, setRaceInfo] = useState();
  const [drivers, setDrivers] = useState();
  const [driver1, setDriver1] = useState();
  const [driver2, setDriver2] = useState();
  let { raceId } = useParams();

  const handleChange = (event) => {
    setDriver1(event.target.value);
  };

  const handleChange2 = (event) => {
    setDriver2(event.target.value);
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
        setDriver2(newObject[1].driverId);
        setDrivers(newObject);
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

  console.log(driver1, driver2);

  return raceInfo && drivers && driver1 && driver2 ? (
    <SlideFade in={true}>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        <Flex width="91vw" direction={["column", "row"]} mb="2">
          <Flex
            align="center"
            mr={["0", "4"]}
            mb={["4", "0"]}
            flexGrow={["1", "0.5"]}
            bg="gray.100"
            borderRadius="lg">
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
            mr={["0", "4"]}
            mb={["4", "0"]}
            flexGrow={["1", "0.5"]}
            bg="gray.100"
            borderRadius="lg">
            <Box p="6" d="flex" flexDirection="column" justifyContent="center" w="100%">
              <Box
                color="gray.600"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
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
                        value={
                          driver.driverId
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
                        value={
                          driver.driverId
                        }>{`#${driver.number} ${driver.code}`}</option>
                    );
                  })}
                </Select>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </SlideFade>
  ) : null;
};

export default HeadToHead;
