import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SlideFade,
  Stack,
  Text,
  useColorModeValue,
  VStack,
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
  const hthButton = useColorModeValue("green.100", "green.700");
  const hthButtonHover = useColorModeValue("green.200", "green.800");
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
            <Stack
              width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
              direction={["column", "column", "column", "row", "row"]}
              mb={2}
              spacing="4">
              <Flex align="center" bg={cardBg} borderRadius="lg">
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
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    color={smallText}
                    mt={2}
                    textTransform="uppercase">
                    Date: {raceInfo.date}
                  </Box>
                </Box>
              </Flex>
              <Flex align="center" bg={orange} borderRadius="lg">
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
              <Flex align="center" borderRadius="lg" flex="1">
                <Button
                  d="flex"
                  w="100%"
                  h="100%"
                  py={4}
                  onClick={() => {
                    history.push(`/season/${year}/round/${raceId}/headtohead`);
                  }}
                  background={hthButton}
                  _hover={{ backgroundColor: hthButtonHover }}
                  _active={{ backgroundColor: hthButtonHover }}>
                  <Text
                    fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
                    fontWeight="semibold"
                    textAlign="left">
                    Head to head
                  </Text>

                  {/* <ExternalLinkIcon /> */}
                </Button>
              </Flex>
            </Stack>

            <RaceResultsTable results={results} cardBg={cardBg} year={year} />

            <Stack
              width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
              direction={["column", "column", "column", "column", "column", "row"]}
              spacing="4"
              mt={2}>
              <Stack
                direction={["column", "column", "column", "row", "row"]}
                flexGrow="1"
                spacing="4">
                {year > 2005 && <QualiResultsTable quali={quali} cardBg={cardBg} />}
                <DriversTable driver={driverStandings} cardBg={cardBg} />
              </Stack>
              <StandingsTable standings={standings} cardBg={cardBg} />
            </Stack>
          </Flex>
        </SlideFade>
      ) : (
        <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
          <Stack
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            direction={["column", "row"]}
            spacing="4">
            <Skeleton
              height="120px"
              align="center"
              flexGrow={["1", "0.5"]}
              bg="gray.100"
              borderRadius="lg"
            />
            <Skeleton
              height="120px"
              align="center"
              flexGrow={["1", "0.5"]}
              bg="gray.100"
              borderRadius="lg"
            />
            <Skeleton
              height="120px"
              align="center"
              flexGrow={["1", "0.5"]}
              bg="gray.100"
              borderRadius="lg"
            />
          </Stack>
          <Skeleton
            align="center"
            m={2}
            mt={4}
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={2}
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={2}
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={2}
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            borderRadius="lg"
            height="64px"
          />
          <Skeleton
            align="center"
            m={2}
            width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
            borderRadius="lg"
            height="64px"
          />
        </Flex>
      )}
    </>
  );
};

export default RacesInfo;
