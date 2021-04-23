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
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const TableRow = ({ res, isLargerThan370, cardBg }) => {
  const { isOpen, onToggle } = useDisclosure();
  const colorDetails = useColorModeValue("orange.100", "yellow.800");
  const smallText = useColorModeValue("gray.600", "whiteAlpha.800");

  const positionGained = res.grid - res.position;
  return (
    <>
      <Tr key={res.code} onClick={onToggle} bg={cardBg}>
        <Td pr={0} isNumeric>
          {res.positionText}
        </Td>
        <Td fontWeight="500" whiteSpace="nowrap">
          {res.code}
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
      <Tr bg={colorDetails} boxShadow="inner">
        <Td colSpan={isLargerThan370 ? 6 : 5} p={0} borderBottomWidth={0}>
          <Collapse in={isOpen} animateOpacity>
            <Box m={3} d="flex" flexDir="column">
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} color={smallText}>
                    Constructor
                  </Text>
                  <Text fontSize="sm" pl={1}>
                    {res.name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} textAlign="right" color={smallText}>
                    Status
                  </Text>
                  <Text fontSize="sm" pr={1} textAlign="right">
                    {res.status}
                  </Text>
                </Box>
              </Box>
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} color={smallText}>
                    Fastest Lap
                  </Text>
                  <Text fontSize="sm" pl={1}>{`Lap ${res.fastestLap}`}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} color={smallText}>
                    Fastest Lap Time
                  </Text>
                  <Text fontSize="sm" textAlign="right" pr={1}>
                    {res.fastestLapTime}
                  </Text>
                </Box>
              </Box>
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} color={smallText}>
                    Start Position
                  </Text>
                  <Text fontSize="sm" pl={1}>{`P${res.grid}`}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} color={smallText}>
                    Positions gained
                  </Text>
                  <Text
                    fontSize="sm"
                    color={positionGained > -1 ? "green.500" : "red.500"}
                    textAlign="right"
                    fontWeight="500"
                    pr={1}>
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

const SmallTable = ({ results, cardBg }) => {
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
            key={res.code}
            cardBg={cardBg}
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

const RaceResultsTable = ({ results, cardBg }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  return (
    <Box
      align="center"
      m={["2", "2", "2", "4"]}
      width="91vw"
      borderRadius="lg"
      borderWidth="0px"
      borderColor="white"
      overflow="hidden"
      bg={cardBg}
      pt={2}
      pb={2}>
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
            {isLargerThan585 ? (
              <Table size={isLargerThan750 ? "md" : "sm"}>
                <Thead bg={cardBg}>
                  <Tr>
                    <Th pr={0} isNumeric>
                      #
                    </Th>
                    <Th>Driver</Th>
                    <Th>Team</Th>
                    <Th pl={0}>PTS</Th>
                    <Th isNumeric>+/-</Th>
                    <Th isNumeric>Laps</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {results.map((res) => {
                    const positionGained = res.grid - res.position;
                    return (
                      <Tr key={res.code}>
                        <Td pr={0} isNumeric>
                          {res.positionText}
                        </Td>
                        <Td fontWeight="500" whiteSpace="nowrap">
                          {isLargerThan585 ? `${res.forename} ${res.surname}` : res.code}
                        </Td>
                        <Td whiteSpace="nowrap">{res.name}</Td>
                        <Td pl={0}>{res.points}</Td>
                        <Td
                          isNumeric
                          color={positionGained > -1 ? "green.500" : "red.500"}>
                          {positionGained > 0 ? `+${positionGained}` : positionGained}
                        </Td>
                        <Td isNumeric>{res.laps}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th pr={0} isNumeric>
                      #
                    </Th>
                    <Th>Driver</Th>
                    <Th>Team</Th>
                    <Th pl={0}>PTS</Th>
                    <Th isNumeric>+/-</Th>
                    <Th isNumeric>Laps</Th>
                  </Tr>
                </Tfoot>
              </Table>
            ) : (
              <SmallTable results={results} cardbg={cardBg} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default RaceResultsTable;
