import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";

const TableRow = ({ res }) => {
  return (
    <>
      <Tr key={res.driverId}>
        <Td pr={2} isNumeric>
          {res.position}
        </Td>
        <Td fontWeight="500" whiteSpace="nowrap" px={0}>
          {res.code}
        </Td>
        <Td px={1}>
          <Badge borderRadius="full" px="2" colorScheme="yellow">
            {res.q1}
          </Badge>
        </Td>
        <Td px={1}>
          <Badge borderRadius="full" px="2" colorScheme="green">
            {res.q2}
          </Badge>
        </Td>
        <Td px={1}>
          <Badge borderRadius="full" px="2" colorScheme="purple">
            {res.q3}
          </Badge>
        </Td>
      </Tr>
    </>
  );
};

const SmallTable = ({ quali, cardBg }) => {
  return (
    <Table size="sm" variant="unstyled">
      <Thead>
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th px={0}>Driver</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
      </Thead>
      <Tbody>
        {quali.map((res) => (
          <TableRow res={res} key={res.code} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th pr={0} isNumeric>
            #
          </Th>
          <Th px={0}>Driver</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const QualiResultsTable = ({ quali, cardBg }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  // console.log(quali);
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
                Qualifying
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pb={0} overflow="auto">
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
                  {quali.map((res) => {
                    const positionGained = res.grid - res.position;
                    return (
                      <Tr key={res.driverId}>
                        <Td pr={0} isNumeric>
                          {res.position}
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
              <SmallTable quali={quali} cardBg={cardBg} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default QualiResultsTable;
