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
  SlideFade,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { GrLocationPin } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RaceResultsTable from "./raceResultsTable";
import QualiResultsTable from "./qualiResultsTable";

const RacesInfo = () => {
  let history = useHistory();
  const [fetching, setFetching] = useState(true);
  const [raceInfo, setRaceInfo] = useState();
  const [results, setResults] = useState();
  const [quali, setQuali] = useState();
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

  const getQuali = async () => {
    await axios
      .get(`http://localhost:5000/api/results/quali/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        const newObject = res.data;
        setQuali(newObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setFetching(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getCircuitInfo();
    getResults();
    getQuali();
  }, []);

  console.log(quali);

  return (
    <>
      {raceInfo && results && quali ? (
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
                <Box
                  p="6"
                  d="flex"
                  flexDirection="column"
                  justifyContent="center"
                  w="100%">
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
                ml={["0", "4"]}
                flexGrow={["1", "0.5"]}
                bg="orange.100"
                borderRadius="lg">
                <Box
                  p="6"
                  d="flex"
                  flexDirection="column"
                  justifyContent="center"
                  w="100%">
                  <Box
                    color="gray.600"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    mb={2}
                    d="flex"
                    alignItems="center">
                    <Icon as={GrLocationPin} mr={1} />
                    Location
                  </Box>
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
            </Flex>

            <RaceResultsTable results={results} />
            <QualiResultsTable quali={quali} />
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
