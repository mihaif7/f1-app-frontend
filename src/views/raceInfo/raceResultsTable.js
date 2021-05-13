import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Collapse,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { colorLabels } from "../../utils/colorLabels";
import "./../team-colors.scss";

const TableRow = ({ res, isLargerThan370, cardBg, year, lastGrid }) => {
  const { isOpen, onToggle } = useDisclosure();
  // const colorDetails = useColorModeValue("orange.100", "yellow.800");
  // const smallText = useColorModeValue("gray.600", "whiteAlpha.800");

  if (res.status === "Collision damage") {
    res.status = "Coll. damage";
  }

  const positionGained =
    res.grid !== 0
      ? res.position
        ? res.grid - res.position
        : "R"
      : lastGrid - res.position;
  const color = colorLabels(res.constructorRef, year);

  return (
    <>
      <Tr onClick={onToggle} bg={cardBg}>
        <Td pr={0} isNumeric>
          {res.positionText}
        </Td>
        <Td fontWeight="500">
          <Box d="flex">
            {year > 2013 && (
              <Box h="16px" w="5px" borderRadius="3xl" className={color} mr={2} />
            )}
            {res.code ?? res.surname.substring(0, 3).toUpperCase()}
          </Box>
        </Td>
        <Td whiteSpace="nowrap" width="100%">
          {res.status === "Finished" ? res.time : res.status}
        </Td>
        {isLargerThan370 && (
          <Td
            textAlign="right"
            fontWeight="500"
            color={positionGained > -1 ? "green.500" : "red.500"}
            pl={0}>
            {positionGained > 0 ? `+${positionGained}` : positionGained}
          </Td>
        )}
        <Td pl={0}>{res.points}</Td>
        <Td d="flex" alignItems="center" align="right" pl={0}>
          {isOpen ? <MinusIcon /> : <AddIcon />}
        </Td>
      </Tr>
      <Tr className={`${color} no-border`} boxShadow="inner">
        <Td colSpan={isLargerThan370 ? 6 : 5} p={0} borderBottomWidth={0}>
          <Collapse in={isOpen} animateOpacity>
            <Box m={3} d="flex" flexDir="column">
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Name
                  </Text>
                  <Text fontSize="sm">{`${res.forename} ${res.surname}`}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} textAlign="right">
                    Constructor
                  </Text>
                  <Text fontSize="sm" textAlign="right">
                    {res.name}
                  </Text>
                </Box>
              </Box>
              {res.fastestLapTime && (
                <Box p={2} d="flex" justifyContent="space-between">
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" pb={1}>
                      Fastest Lap
                    </Text>
                    <Text fontSize="sm">{`Lap ${res.fastestLap}`}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" pb={1}>
                      Fastest Lap Time
                    </Text>
                    <Text fontSize="sm" textAlign="right">
                      {res.fastestLapTime}
                    </Text>
                  </Box>
                </Box>
              )}
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Start Position
                  </Text>
                  <Text fontSize="sm">
                    {res.grid !== 0 ? `P${res.grid}` : "Pit Lane"}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Positions gained
                  </Text>
                  <Text
                    fontSize="sm"
                    // color={positionGained > -1 ? "green.500" : "red.500"}
                    textAlign="right"
                    fontWeight="500">
                    {positionGained > 0 ? `+${positionGained}` : positionGained}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </Td>
      </Tr>
    </>
  );
};

const SmallTable = ({ results, cardBg, year }) => {
  const [isLargerThan370] = useMediaQuery("(min-width: 370px)");
  const lastGrid = results.length;
  return (
    <Table size="sm" variant="unstyled">
      <Thead bg={cardBg}>
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th pr={0}>Driver</Th>
          <Th>Time</Th>
          {isLargerThan370 && (
            <Th textAlign="right" pl={0}>
              +/-
            </Th>
          )}
          <Th pl={0}>PTS</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((res) => (
          <TableRow
            res={res}
            isLargerThan370={isLargerThan370}
            key={uuidv4()}
            cardBg={cardBg}
            year={year}
            lastGrid={lastGrid}
          />
        ))}
      </Tbody>
      <Tfoot bg={cardBg}>
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th pr={0}>Driver</Th>
          <Th>Time</Th>
          {isLargerThan370 && (
            <Th textAlign="right" pl={0}>
              +/-
            </Th>
          )}
          <Th pl={0}>PTS</Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const RaceResultsTable = ({ results, cardBg, year }) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan1125] = useMediaQuery("(min-width: 1125px)");
  const { colorMode } = useColorMode();
  const lastGrid = results.length;

  const { driverId } = results.reduce(function (prev, curr) {
    return prev.fastestLapTime < curr.fastestLapTime || curr.fastestLapTime === null
      ? prev
      : curr;
  });

  return (
    <Box
      align="center"
      width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
      borderRadius="3xl"
      borderWidth="0px"
      borderColor="white"
      overflow="hidden"
      bg={cardBg}
      pt={2}
      pb={isLargerThan900 ? 4 : 2}
      my={[2, 2, 3]}
      boxShadow={["md", "lg"]}>
      {isLargerThan900 ? (
        <>
          <Box flex="1" px="6" py="2">
            <Text fontSize="xl" fontWeight="semibold" textAlign="left">
              Results
            </Text>
          </Box>

          <Table
            size={isLargerThan1125 ? "md" : "sm"}
            variant="striped"
            colorScheme={colorMode === "light" ? "blackAlpha" : "gray"}>
            <Thead bg={cardBg}>
              <Tr>
                <Th isNumeric>#</Th>
                <Th pl={0}>Driver</Th>
                <Th>Team</Th>
                <Th>Time</Th>
                <Th isNumeric>+/-</Th>
                <Th textAlign="center" whiteSpace="nowrap">
                  Start Pos.
                </Th>
                <Th textAlign="center">Fastest Lap</Th>
                <Th isNumeric>Laps</Th>
                <Th>PTS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((res) => {
                const positionGained =
                  res.grid !== 0
                    ? res.position
                      ? res.grid - res.position
                      : "R"
                    : lastGrid - res.position;
                return (
                  <Tr key={uuidv4()}>
                    <Td isNumeric py={2} borderBottom={0}>
                      {res.positionText}
                    </Td>
                    <Td
                      fontWeight="500"
                      whiteSpace="nowrap"
                      py={2}
                      pl={0}
                      borderBottom={0}>
                      <Box d="flex">
                        {year > 2013 && (
                          <Box
                            h="20px"
                            w="5px"
                            borderRadius="3xl"
                            className={colorLabels(res.constructorRef, year)}
                            mr={2}
                          />
                        )}
                        {`${res.forename} ${res.surname}`}
                      </Box>
                    </Td>
                    <Td whiteSpace="nowrap" py={2} borderBottom={0}>
                      {res.name}
                    </Td>
                    <Td whiteSpace="nowrap" py={2} borderBottom={0}>
                      {res.status === "Finished" ? res.time : res.status}
                    </Td>
                    <Td
                      isNumeric
                      color={positionGained > -1 ? "green.500" : "red.500"}
                      py={2}
                      fontWeight="500"
                      borderBottom={0}>
                      {positionGained > 0 ? `+${positionGained}` : positionGained}
                    </Td>
                    <Td py={2} textAlign="center" whiteSpace="nowrap" borderBottom={0}>
                      {res.grid !== 0 ? `P${res.grid}` : "Pit Lane"}
                    </Td>
                    <Td
                      py={2}
                      textAlign="center"
                      color={res.driverId === driverId && "#A429C9"}
                      borderBottom={0}
                      fontWeight={500}>
                      {res.fastestLapTime}
                    </Td>
                    <Td isNumeric py={2} borderBottom={0}>
                      {res.laps}
                    </Td>
                    <Td py={2} borderBottom={0} fontWeight={500}>
                      {res.points}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </>
      ) : (
        <Accordion allowToggle>
          <AccordionItem borderTopWidth="0px" _last={{ borderBottomWidth: "0px" }}>
            <AccordionButton
              _focus={{ boxShadow: "none !important" }}
              _hover={{ background: cardBg }}>
              <Box flex="1">
                <Text fontSize="xl" fontWeight="semibold" textAlign="left">
                  Results
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0} pb={0}>
              <SmallTable results={results} cardbg={cardBg} year={year} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};

export default RaceResultsTable;
