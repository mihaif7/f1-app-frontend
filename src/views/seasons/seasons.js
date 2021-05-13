import {
  Box,
  Button,
  Flex,
  Skeleton,
  SlideFade,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Tilt from "react-tilt";

import "../team-colors.scss";

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

const SeasonCard = ({ year, history }) => {
  const { colorMode } = useColorMode();

  const lightGradient = {
    normal: "linear(315deg, #FDB4C7 0%, #FFECD3 74%)",
    hover: "linear(315deg, #fdbccd 0%, #ffeed7 74%)",
    active: "linear(315deg, #e4a2b3 0%, #e6d4be 74%)",
  };
  const darkGradient = {
    normal: "linear(315deg, #861657  0%, #ffa69e  74%)",
    hover: "linear(315deg, #6b1246  0%, #cc857e  74%)",
    active: "linear(315deg, #500d34 0%, #99645f  74%)",
  };
  return (
    <SlideFade in={true}>
      <Flex align="center" m={[2, 2, 3]}>
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
            borderRadius="3xl"
            boxShadow="lg"
            bgGradient={
              colorMode === "light" ? lightGradient.normal : darkGradient.normal
            }
            _hover={{
              bgGradient:
                colorMode === "light" ? lightGradient.hover : darkGradient.hover,
            }}
            _active={{
              bgGradient:
                colorMode === "light" ? lightGradient.active : darkGradient.active,
            }}>
            <Box p="6">
              <Box
                fontWeight="semibold"
                fontSize="3rem"
                lineHeight="3rem"
                as="p"
                minW="110px"
                color={colorMode === "light" ? "blackAlpha.700" : "whiteAlpha.800"}>
                {year}
              </Box>
              <Box d="flex" justifyContent="flex-end">
                <Box
                  color={colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.700"}
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
    await api
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
                height={["130px", "160px"]}
                width={["91vw", "40vw", "30vw", "30vw", "20vw", "12vw"]}
                colorScheme="gray"
                borderRadius="3xl"
                m={[2, 2, 3]}
              />
            ))}
      </Flex>
    </>
  );
};

export default Seasons;
