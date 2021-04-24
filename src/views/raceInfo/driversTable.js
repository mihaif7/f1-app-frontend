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

import { v4 as uuidv4 } from "uuid";

const TableRow = ({ res }) => {
  return (
    <>
      <Tr>
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

const SmallTable = ({ driver, cardBg }) => {
  // console.log("Aici:", driver);
  return (
    <Table size="sm" variant="unstyled">
      <Thead>
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Driver</Th>
          <Th textAlign="center">PTS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {driver.map((res) => (
          <TableRow res={res} key={uuidv4()} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Driver</Th>
          <Th textAlign="center">PTS</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const DriversTable = ({ driver, cardBg }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  // console.log("valoare", driver);
  return (
    <Box
      align="center"
      m={2}
      width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
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
                Drivers
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pb={0} overflow="auto">
            {isLargerThan585 ? (
              <Table size={isLargerThan750 ? "md" : "sm"}>
                <Thead bg={cardBg}>
                  <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Driver</Th>
                    <Th textAlign="center">PTS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {driver.map((res) => {
                    return (
                      <Tr key={res.driverId}>
                        <Td isNumeric>{res.position}</Td>
                        <Td fontWeight="500" whiteSpace="nowrap">
                          {`${res.forename} ${res.surname}`}
                        </Td>
                        <Td textAlign="center">
                          <Badge
                            borderRadius="full"
                            px="2"
                            colorScheme="orange"
                            minW="37px">
                            {res.points}
                          </Badge>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Driver</Th>
                    <Th textAlign="center">PTS</Th>
                  </Tr>
                </Tfoot>
              </Table>
            ) : (
              <SmallTable driver={driver} cardBg={cardBg} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default DriversTable;
