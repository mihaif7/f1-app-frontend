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
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import "./../team-colors.scss";
import { colorLabels } from "../../utils/colorLabels";

const TableRow = ({ res, isLargerThan370, cardBg, year }) => {
  const { isOpen, onToggle } = useDisclosure();
  // const colorDetails = useColorModeValue("orange.100", "yellow.800");
  // const smallText = useColorModeValue("gray.600", "whiteAlpha.800");

  const positionGained = res.position ? res.grid - res.position : "R";
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
              <Box h="16px" w="5px" borderRadius="lg" className={color} mr={2} />
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
            color={positionGained > -1 ? "green.500" : "red.500"}>
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
                  <Text fontSize="sm">{`P${res.grid}`}</Text>
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
  return (
    <Table size="sm" variant="unstyled">
      <Thead bg={cardBg}>
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th pr={0}>Driver</Th>
          <Th>Time</Th>
          {isLargerThan370 && <Th textAlign="right">+/-</Th>}
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
          {isLargerThan370 && <Th textAlign="right">+/-</Th>}
          <Th pl={0}>PTS</Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const RaceResultsTable = ({ results, cardBg, year }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  return (
    <Box
      align="center"
      width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
      borderRadius="lg"
      borderWidth="0px"
      borderColor="white"
      overflow="hidden"
      bg={cardBg}
      pt={2}
      pb={[2, 4]}
      my={2}>
      {isLargerThan585 ? (
        <>
          <Box flex="1" px="6" py="2">
            <Text fontSize="xl" fontWeight="semibold" textAlign="left">
              Results
            </Text>
          </Box>

          <Table size={isLargerThan750 ? "md" : "sm"}>
            <Thead bg={cardBg}>
              <Tr>
                <Th isNumeric>#</Th>
                <Th pl={0}>Driver</Th>
                <Th w="99%">Team</Th>
                <Th>PTS</Th>
                <Th isNumeric>+/-</Th>
                <Th isNumeric>Laps</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((res) => {
                const positionGained = res.position ? res.grid - res.position : "R";
                return (
                  <Tr key={uuidv4()}>
                    <Td isNumeric py={2}>
                      {res.positionText}
                    </Td>
                    <Td fontWeight="500" whiteSpace="nowrap" py={2} pl={0}>
                      <Box d="flex">
                        {year > 2013 && (
                          <Box
                            h="20px"
                            w="5px"
                            borderRadius="lg"
                            className={colorLabels(res.constructorRef, year)}
                            mr={2}
                          />
                        )}
                        {isLargerThan585 ? `${res.forename} ${res.surname}` : res.code}
                      </Box>
                    </Td>
                    <Td whiteSpace="nowrap" py={2}>
                      {res.name}
                    </Td>
                    <Td py={2}>{res.points}</Td>
                    <Td
                      isNumeric
                      color={positionGained > -1 ? "green.500" : "red.500"}
                      py={2}
                      fontWeight="500">
                      {positionGained > 0 ? `+${positionGained}` : positionGained}
                    </Td>
                    <Td isNumeric py={2}>
                      {res.laps}
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
