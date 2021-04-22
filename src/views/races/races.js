import { Box, Button, Center, Flex, ScaleFade, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory, useParams } from "react-router-dom";

const RaceCard = ({ race, history, year }) => {
  const { ref, inView } = useInView();
  return (
    <ScaleFade initialScale={0.9} in={inView}>
      <Flex align="center" m={["2", "2", "2", "4"]} ref={ref}>
        <Button
          d="flex"
          height="110px"
          p="0"
          onClick={() => {
            history.push(`/season/${year}/round/${race.raceId}`);
          }}
          color="green.100"
          width={["91vw", "91vw", "91vw", "40vw"]}>
          <Box p="6" d="flex" flexDirection="column" justifyContent="center">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              mb={2}>
              Round {race.round} - {race.date}
            </Box>
            <Box
              fontWeight="semibold"
              fontSize={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
              lineHeight={["1.35rem", "1.5rem", "2rem", "2.05rem"]}
              as="p"
              color="gray.700">
              {race.name}
            </Box>
          </Box>
        </Button>
      </Flex>
    </ScaleFade>
  );
};

const Races = () => {
  let history = useHistory();
  const [fetching, setFetching] = useState(true);
  const [races, setRaces] = useState([]);
  let { year } = useParams();

  const getData = async () => {
    await axios
      .get(`http://192.168.0.107:5000/api/races/${year}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://192.168.0.107:3000",
        },
      })
      .then((res) => {
        const newObject = res.data;
        setRaces(newObject);
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
    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {races.length !== 0 ? (
        <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
          {races.map((race) => {
            return (
              <RaceCard race={race} history={history} year={year} key={race.raceId} />
            );
          })}
        </Flex>
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

export default Races;
