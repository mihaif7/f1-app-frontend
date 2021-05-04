import { Box, Button, Flex, Skeleton, SlideFade, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory, useParams } from "react-router-dom";
import Tilt from "react-tilt";

const RaceCard = ({ race, history, year }) => {
  const { ref, inView } = useInView();
  return (
    <SlideFade initialScale={0.9} in={inView}>
      <Flex align="center" m={[2, 2, 3]} ref={ref}>
        <Tilt
          className="Tilt"
          options={{
            reverse: true, // reverse the tilt direction
            max: 10, // max tilt rotation (degrees)
            perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
            scale: 1, // 2 = 200%, 1.5 = 150%, etc..
            speed: 300, // Speed of the enter/exit transition
            transition: true, // Set a transition on enter/exit.
            easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
          }}>
          <Button
            d="flex"
            height={["130px", "160px"]}
            p="0"
            onClick={() => {
              history.push(`/season/${year}/round/${race.raceId}`);
            }}
            width={["91vw", "91vw", "91vw", "40vw", "40vw", "25vw"]}
            borderRadius="3xl"
            boxShadow="lg">
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
        </Tilt>
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
                height={["130px", "160px"]}
                width={["91vw", "91vw", "91vw", "40vw", "40vw", "25vw"]}
                colorScheme="gray"
                m={[2, 2, 3]}
                borderRadius="3xl"
              />
            ))}
      </Flex>
    </>
  );
};

export default Races;
