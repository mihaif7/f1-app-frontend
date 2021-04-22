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

const TableRow = ({ res }) => {
  const { isOpen, onToggle } = useDisclosure();
  const positionGained = res.grid - res.position;
  return (
    <>
      <Tr key={res.code} onClick={onToggle} bg="gray.50">
        <Td pr={0} isNumeric>
          {res.positionText}
        </Td>
        <Td fontWeight="500" whiteSpace="nowrap">
          {res.code}
        </Td>
        <Td whiteSpace="nowrap">{res.status === "Finished" ? res.time : res.status}</Td>
        <Td pl={0}>{res.points}</Td>
      </Tr>
      <Tr bg="orange.50" boxShadow="inner">
        <Td colSpan={4} p={0} borderBottomWidth={0}>
          <Collapse in={isOpen} animateOpacity>
            <Box m={3} d="flex" flexDir="column">
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Constructor
                  </Text>
                  <Text fontSize="sm" pl={1}>
                    {res.name}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1} textAlign="right">
                    Status
                  </Text>
                  <Text fontSize="sm" pr={1} textAlign="right">
                    {res.status}
                  </Text>
                </Box>
              </Box>
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Fastest Lap
                  </Text>
                  <Text fontSize="sm" pl={1}>{`Lap ${res.fastestLap}`}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Fastest Lap Time
                  </Text>
                  <Text fontSize="sm" textAlign="right" pr={1}>
                    {res.fastestLapTime}
                  </Text>
                </Box>
              </Box>
              <Box p={2} d="flex" justifyContent="space-between">
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Start Position
                  </Text>
                  <Text fontSize="sm" pl={1}>{`P${res.grid}`}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" pb={1}>
                    Positions gained
                  </Text>
                  <Text
                    fontSize="sm"
                    color={positionGained > -1 ? "green.500" : "red.500"}
                    textAlign="right"
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

const SmallTable = ({ results }) => {
  return (
    <Table size="sm" variant="unstyled">
      <Thead bg="gray.50">
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th>Driver</Th>
          <Th>Time</Th>
          <Th pl={0}>PTS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((res) => (
          <TableRow res={res} key={res.code} />
        ))}
      </Tbody>
      <Tfoot bg="gray.50">
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th>Driver</Th>
          <Th>Time</Th>
          <Th pl={0}>PTS</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const RaceResultsTable = ({ results }) => {
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
      bg="gray.50"
      pt={2}
      pb={2}>
      <Accordion allowToggle bg="gray.50" borderColor="gray.50">
        <AccordionItem>
          <AccordionButton
            _focus={{ boxShadow: "none !important" }}
            _hover={{ background: "gray.50" }}>
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
                <Thead>
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
              <SmallTable results={results} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default RaceResultsTable;
