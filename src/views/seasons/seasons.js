import { Box, Button, Flex, Skeleton, SlideFade, useMediaQuery } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";
import Tilt from "react-tilt";

const SeasonCard = ({ year, history }) => {
  const { ref, inView } = useInView();
  return (
    <SlideFade initialScale={0.9} in={inView}>
      <Flex align="center" m={3} ref={ref}>
        <Tilt
          className="Tilt"
          options={{
            reverse: true, // reverse the tilt direction
            max: 12, // max tilt rotation (degrees)
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
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
              history.push(`/season/${year}`);
            }}
            width={["91vw", "40vw", "30vw", "30vw", "20vw", "12vw"]}
            borderRadius="lg"
            boxShadow="lg">
            <Box p="6">
              <Box
                fontWeight="semibold"
                fontSize="3rem"
                lineHeight="3rem"
                as="p"
                minW="110px">
                {year}
              </Box>
              <Box d="flex" justifyContent="flex-end">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase">
                  Season
                </Box>
              </Box>
            </Box>
          </Button>
        </Tilt>
      </Flex>
    </SlideFade>
  );
};

const Seasons = () => {
  let history = useHistory();
  const [seasons, setSeasons] = useState();
  const [fetching, setFetching] = useState(false);
  const [big] = useMediaQuery("(min-width: 768px)");

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/seasons`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        },
      })
      .then((res) => {
        const newObject = res.data;

        setSeasons(newObject);
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
  }, []);

  return (
    <>
      <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
        {seasons
          ? seasons.map(({ year }) => {
              return <SeasonCard year={year} history={history} key={year} />;
            })
          : fetching &&
            [...Array(big ? 25 : 6)].map((e, i) => (
              <Skeleton
                key={i}
                height="110px"
                width={["91vw", "40vw", "30vw", "20vw"]}
                colorScheme="gray"
                mx={2}
                borderRadius="lg"
                m={2}
              />
            ))}
      </Flex>
    </>
  );
};

export default Seasons;
