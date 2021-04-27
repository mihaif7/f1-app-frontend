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
import "./team-colors.scss";
import colorLabels from "./utils/colorLabels";

const TableRow = ({ res }) => {
  let { year } = useParams();
  return (
    <>
      <Tr key={res.constructorId}>
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
            {res.name}
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

const SmallTable = ({ standings, cardBg }) => {
  return (
    <Table size="sm" variant="unstyled">
      <Thead>
        <Tr>
          <Th isNumeric whiteSpace="nowrap" pr={0}>
            #
          </Th>
          <Th>Team</Th>
          <Th textAlign="center" whiteSpace="nowrap">
            PTS
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {standings.map((res) => (
          <TableRow res={res} key={res.constructorId} />
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th isNumeric whiteSpace="nowrap" pr={0}>
            #
          </Th>
          <Th>Team</Th>
          <Th textAlign="center" whiteSpace="nowrap">
            PTS
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const StandingsTable = ({ standings, cardBg }) => {
  let { year } = useParams();
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  return (
    <Box
      align="center"
      m={[0, 2]}
      mt={4}
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
                Constructors
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
                    <Th>Team</Th>
                    <Th textAlign="center">PTS</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {standings.map((res) => {
                    return (
                      <Tr key={res.constructorId}>
                        <Td isNumeric>{res.position}</Td>
                        <Td fontWeight="500" whiteSpace="nowrap">
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
                            {res.name}
                          </Box>
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
                <Tfoot bg={cardBg}>
                  <Tr>
                    <Th isNumeric>#</Th>
                    <Th>Team</Th>
                    <Th textAlign="center">PTS</Th>
                  </Tr>
                </Tfoot>
              </Table>
            ) : (
              <SmallTable standings={standings} cardBg={cardBg} />
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default StandingsTable;
