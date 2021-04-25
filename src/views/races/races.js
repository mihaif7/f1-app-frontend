import { Box, Button, Flex, Skeleton, SlideFade, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory, useParams } from "react-router-dom";

const RaceCard = ({ race, history, year }) => {
  const { ref, inView } = useInView();
  return (
    <SlideFade initialScale={0.9} in={inView}>
      <Flex align="center" m={["2", "2", "2", "4"]} ref={ref}>
        <Button
          d="flex"
          height="110px"
          p="0"
          onClick={() => {
            history.push(`/season/${year}/round/${race.raceId}`);
          }}
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
              as="p">
              {race.name}
            </Box>
          </Box>
        </Button>
      </Flex>
    </SlideFade>
  );
};

const Races = () => {
  let history = useHistory();
  const [races, setRaces] = useState();
  const [fetching, setFetching] = useState(false);
  const [big] = useMediaQuery("(min-width: 768px)");
  let { year } = useParams();

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/races/${year}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
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
    setTimeout(() => setFetching(true), 250);
    getData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [year]);

  return (
    <>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        {races
          ? races.map((race) => {
              return (
                <RaceCard race={race} history={history} year={year} key={race.raceId} />
              );
            })
          : fetching &&
            [...Array(big ? 16 : 6)].map((e, i) => (
              <Skeleton
                key={i}
                height="110px"
                width={["91vw", "91vw", "91vw", "40vw"]}
                colorScheme="gray"
                mx={2}
                borderRadius="lg"
                m={["2", "2", "2", "4"]}
              />
            ))}
      </Flex>
    </>
  );
};

export default Races;
