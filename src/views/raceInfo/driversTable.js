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
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./../team-colors.scss";
import { colorLabels } from "../../utils/colorLabels";

const TableRow = ({ res }) => {
  let { year } = useParams();

  return (
    <>
      <Tr>
        <Td fontWeight="500" whiteSpace="nowrap" pr={0}>
          {res.position}
        </Td>
        <Td fontWeight="500" w="99%">
          <Box d="flex">
            {year > 2013 && (
              <Box
                h="16px"
                w="5px"
                borderRadius="lg"
                className={colorLabels(res.constructorRef, year)}
                mr={2}
              />
            )}
            {`${res.forename} ${res.surname}`}
          </Box>
        </Td>
        <Td textAlign="center" whiteSpace="nowrap">
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
          <Th isNumeric whiteSpace="nowrap" pr={0}>
            #
          </Th>
          <Th w="99%">Driver</Th>
          <Th textAlign="center" whiteSpace="nowrap">
            PTS
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {driver.map((res) => (
          <TableRow res={res} key={uuidv4()} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th isNumeric pr={0}>
            #
          </Th>
          <Th>Driver</Th>
          <Th textAlign="center">PTS</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const DriversTable = ({ driver, cardBg }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  let { year } = useParams();

  // console.log("valoare", driver);
  return (
    <Box
      align="center"
      borderRadius="lg"
      borderWidth="0px"
      borderColor="white"
      overflow="hidden"
      bg={cardBg}
      pt={2}
      pb={isLargerThan900 ? 4 : 2}
      boxShadow={["md","lg"]}>
      {isLargerThan900 ? (
        <>
          <Box flex="1" px="6" py="2">
            <Text fontSize="xl" fontWeight="semibold" textAlign="left">
              Drivers
            </Text>
          </Box>
          <Table size={isLargerThan750 ? "md" : "sm"}>
            <Thead bg={cardBg}>
              <Tr>
                <Th isNumeric>#</Th>
                <Th w="99%" pl={0}>
                  Driver
                </Th>
                <Th textAlign="center">PTS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {driver.map((res) => {
                return (
                  <Tr key={res.driverId}>
                    <Td isNumeric py={2}>
                      {res.position}
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
                        {`${res.forename} ${res.surname}`}
                      </Box>
                    </Td>
                    <Td textAlign="center" py={2}>
                      <Badge borderRadius="full" px="2" colorScheme="orange" minW="37px">
                        {res.points}
                      </Badge>
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
                  Drivers
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={0} pb={0} overflow="auto">
              <SmallTable driver={driver} cardBg={cardBg} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  );
};

export default DriversTable;
