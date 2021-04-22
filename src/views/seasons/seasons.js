import { Box, Button, Center, Flex, ScaleFade, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useHistory } from "react-router-dom";

const SeasonCard = ({ year, history }) => {
  const { ref, inView } = useInView();
  return (
    <ScaleFade initialScale={0.9} in={inView}>
      <Flex align="center" m={["2", "2", "2", "4"]} ref={ref}>
        <Button
          d="flex"
          height="110px"
          p="0"
          onClick={() => {
            history.push(`/season/${year}`);
          }}
          color="green.100"
          width={["80vw", "80vw", "30vw", "20vw"]}>
          <Box p="6">
            <Box
              fontWeight="semibold"
              fontSize="3rem"
              lineHeight="3rem"
              as="p"
              color="gray.700"
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
      </Flex>
    </ScaleFade>
  );
};

const Seasons = () => {
  let history = useHistory();
  const [fetching, setFetching] = useState(true);
  const [seasons, setSeasons] = useState([]);

  const getData = async () => {
    await axios
      .get("${process.env.REACT_APP_API_URL}/seasons", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://192.168.0.107:3000",
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
    const timeout = setTimeout(() => setFetching(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {seasons.length !== 0 ? (
        <Flex align="center" justify="center" wrap="wrap" width="100%" px="2">
          {seasons.map(({ year }) => {
            return <SeasonCard year={year} history={history} key={year} />;
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

export default Seasons;
