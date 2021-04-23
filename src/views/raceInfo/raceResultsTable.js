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
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

const TableRow = ({ res, isLargerThan370 }) => {
  const { isOpen, onToggle } = useDisclosure();
  const positionGained = res.grid - res.position;
  return (
    <>
      <Tr key={res.code} onClick={onToggle} bg="gray.100">
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
      <Tr bg="orange.50" boxShadow="inner">
        <Td colSpan={isLargerThan370 ? 6 : 5} p={0} borderBottomWidth={0}>
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

const SmallTable = ({ results }) => {
  const [isLargerThan370] = useMediaQuery("(min-width: 370px)");
  return (
    <Table size="sm" variant="unstyled">
      <Thead bg="gray.100">
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
          <TableRow res={res} isLargerThan370={isLargerThan370} key={res.code} />
        ))}
      </Tbody>
      <Tfoot bg="gray.100">
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
      bg="gray.100"
      pt={2}
      pb={2}>
      <Accordion allowToggle bg="gray.100" borderColor="gray.100">
        <AccordionItem>
          <AccordionButton
            _focus={{ boxShadow: "none !important" }}
            _hover={{ background: "gray.100" }}>
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
