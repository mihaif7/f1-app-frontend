import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SlideFade,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DriversTable from "./driversTable";
import QualiResultsTable from "./qualiResultsTable";
import RaceResultsTable from "./raceResultsTable";
import StandingsTable from "./standingsTable";

const RacesInfo = () => {
  let history = useHistory();
  const [raceInfo, setRaceInfo] = useState();
  const [results, setResults] = useState();
  const [quali, setQuali] = useState();
  const [standings, setStandings] = useState();
  const [driverStandings, setDriverStandings] = useState();
  let { year, raceId } = useParams();

  const cardBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const orange = useColorModeValue("orange.100", "yellow.800");
  const smallText = useColorModeValue("gray.600", "whiteAlpha.600");
  const bigText = useColorModeValue("grey.200", "whiteAlpha.900");

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

  const getResults = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/results/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
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
      .get(`${process.env.REACT_APP_API_URL}/api/results/quali/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
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

  const getStandingsConstructors = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/results/standings/constructors/${raceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
          },
        }
      )
      .then((res) => {
        const newObject = res.data;
        setStandings(newObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStandingsDrivers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/results/standings/drivers/${raceId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        },
      })
      .then((res) => {
        const newObject = res.data;
        setDriverStandings(newObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCircuitInfo();
    getResults();
    getQuali();
    getStandingsConstructors();
    getStandingsDrivers();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {raceInfo && results && quali && standings && driverStandings ? (
        <SlideFade in={true}>
          <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
            <Flex width="91vw" direction={["column", "row"]} mb="2">
              <Flex
                align="center"
                mr={["0", "4"]}
                mb={["4", "0"]}
                flexGrow={["1", "0.5"]}
                bg={cardBg}
                borderRadius="lg">
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
                    Round {raceInfo.round}
                  </Box>
                  <Box
                    fontWeight="semibold"
                    fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                    lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                    as="p">
                    {raceInfo.raceName}
                  </Box>
                  <Box
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    color={smallText}
                    mt={2}>
                    Date: {raceInfo.date}
                  </Box>
                </Box>
              </Flex>
              <Flex
                align="center"
                ml={["0", "4"]}
                flexGrow={["1", "0.5"]}
                bg={orange}
                borderRadius="lg">
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
                    mb={2}
                    d="flex"
                    alignItems="center">
                    Location
                  </Box>
                  <Box
                    fontWeight="semibold"
                    fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                    lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                    as="p"
                    color={bigText}>
                    {raceInfo.circuitName}
                  </Box>
                  <Box
                    color={smallText}
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

            <Box
              align="center"
              m={["2", "2", "2", "4"]}
              width="91vw"
              borderRadius="lg"
              borderWidth="0px"
              borderColor="white"
              overflow="hidden"
              alignItems="center">
              <Button
                d="flex"
                w="100%"
                height="64px"
                py={4}
                onClick={() => {
                  history.push(`/season/${year}/round/${raceId}/headtohead`);
                }}>
                <Text fontSize="xl" fontWeight="semibold" textAlign="left" flex="1">
                  Head to head
                </Text>

                <ExternalLinkIcon />
              </Button>
            </Box>

            {year > 2005 && <QualiResultsTable quali={quali} cardBg={cardBg} />}
            <RaceResultsTable results={results} cardBg={cardBg} />
            <DriversTable driver={driverStandings} cardBg={cardBg} />
            <StandingsTable standings={standings} cardBg={cardBg} />
          </Flex>
        </SlideFade>
      ) : (
        <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
          <Flex width="91vw" direction={["column", "row"]} mb="2">
            <Skeleton
              height="110px"
              align="center"
              mr={["0", "4"]}
              mb={["4", "0"]}
              flexGrow={["1", "0.5"]}
              bg="gray.100"
              borderRadius="lg"
            />
            <Skeleton
              height="110px"
              align="center"
              mr={["0", "4"]}
              flexGrow={["1", "0.5"]}
              bg="gray.100"
              borderRadius="lg"
            />
          </Flex>
          <Skeleton
            align="center"
            m={["2", "2", "2", "4"]}
            width="91vw"
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={["2", "2", "2", "4"]}
            width="91vw"
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={["2", "2", "2", "4"]}
            width="91vw"
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={["2", "2", "2", "4"]}
            width="91vw"
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={["2", "2", "2", "4"]}
            width="91vw"
            borderRadius="lg"
            height="64px"
          />
        </Flex>
      )}
    </>
  );
};

export default RacesInfo;
