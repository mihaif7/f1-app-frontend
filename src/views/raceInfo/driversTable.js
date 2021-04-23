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
      <Tr key={res.code} bg="gray.100">
        <Td>{res.position}</Td>
        <Td fontWeight="500" whiteSpace="nowrap">
          {`${res.forename} ${res.surname}`}
        </Td>
        <Td textAlign="center">
          <Badge borderRadius="full" px="2" colorScheme="orange" minW="37px">
            {res.points}
          </Badge>
        </Td>
      </Tr>
    </>
  );
};

const SmallTable = ({ driver }) => {
  // console.log("Aici:", driver);
  return (
    <Table size="sm" variant="unstyled">
      <Thead bg="gray.100">
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Driver</Th>
          <Th textAlign="center">PTS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {driver.map((res) => (
          <TableRow res={res} key={res.code} />
        ))}
      </Tbody>
      <Tfoot bg="gray.100">
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Driver</Th>
          <Th textAlign="center">PTS</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const DriversTable = ({ driver }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  // console.log("valoare", driver);
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
                Drivers
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pb={0} overflow="auto">
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
                  {driver.map((res) => {
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
              <SmallTable driver={driver} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default DriversTable;
