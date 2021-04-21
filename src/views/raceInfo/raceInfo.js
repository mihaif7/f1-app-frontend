import {
  Badge,
  Box,
  Center,
  Flex,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useMediaQuery,
  ScaleFade,
  SlideFade 
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const RacesInfo = () => {
  let history = useHistory();
  const [fetching, setFetching] = useState(true);
  const [raceInfo, setRaceInfo] = useState();
  const [results, setResults] = useState();
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");
  let { year, raceId } = useParams();

  const getCircuitInfo = async () => {
    await axios
      .get(`http://localhost:5000/api/circuit/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
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

  const getResults = async () => {
    await axios
      .get(`http://localhost:5000/api/results/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        const newObject = res.data;
        setResults(newObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setFetching(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getCircuitInfo();
    getResults();
  }, []);

  console.log(results);

  return (
    <>
      {raceInfo && results ? (
        <SlideFade  in={true}>
        <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
          {/* <ScaleFade initialScale={0.9} in={true}> */}
            <Flex
              align="center"
              m={["2", "2", "2", "4"]}
              width="91vw"
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
              </Box>
            </Flex>
          {/* </ScaleFade> */}
          {/* <ScaleFade initialScale={0.9} in={true}> */}
            <Flex
              align="center"
              m={["2", "2", "2", "4"]}
              width="91vw"
              borderRadius="lg"
              borderWidth="1px"
              overflow="auto"
              bg="teal.50"
              pt={2}
              pb={2}>
              <Table size={isLargerThan750 ? "md" : "sm"}>
                <Thead>
                  <Tr>
                    <Th pr={0} isNumeric>
                      #
                    </Th>
                    <Th>Driver</Th>
                    <Th>Team</Th>
                    <Th isNumeric>+/-</Th>
                    <Th isNumeric>Laps</Th>
                    <Th isNumeric>Points</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {results.map((res) => {
                    const positionGained = res.grid - res.position;
                    return (
                      <Tr>
                        <Td pr={0} isNumeric>
                          {res.positionText}
                        </Td>
                        <Td fontWeight="500" whiteSpace="nowrap">
                          {isLargerThan585 ? `${res.forename} ${res.surname}` : res.code}
                        </Td>
                        <Td whiteSpace="nowrap">{res.name}</Td>
                        <Td
                          isNumeric
                          color={positionGained > -1 ? "green.500" : "red.500"}>
                          {positionGained > 0 ? `+${positionGained}` : positionGained}
                        </Td>
                        <Td isNumeric>{res.laps}</Td>
                        <Td isNumeric>{res.points}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th pr={0} isNumeric>
                      #
                    </Th>
                    <Th>Driver</Th>
                    <Th>Team</Th>
                    <Th isNumeric>+/-</Th>
                    <Th isNumeric>Laps</Th>
                    <Th isNumeric>Points</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Flex>
          {/* </ScaleFade> */}
          {/* <ScaleFade initialScale={0.9} in={true}> */}
            <Flex
              align="center"
              m={["2", "2", "2", "4"]}
              width="91vw"
              bg="orange.100"
              borderRadius="lg">
              <Box p="6" d="flex" flexDirection="column" justifyContent="center">
                <Box
                  fontWeight="semibold"
                  fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                  lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                  as="p"
                  color="gray.700">
                  {raceInfo.circuitName}
                </Box>
                <Box
                  color="gray.600"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  mt={2}>
                  {raceInfo.location}, {raceInfo.country}
                </Box>
              </Box>
            </Flex>
          {/* </ScaleFade> */}
        </Flex>
        </SlideFade>
      ) : (
        !fetching && (
          <Center h="100vh">
            <Spinner size="xl" color="red.500" />
          </Center>
        )
      )}
    </>
  );
};

export default RacesInfo;
