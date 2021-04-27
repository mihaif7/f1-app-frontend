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
      <Tr key={res.driverId}>
        <Td pr={2} fontWeight="500" isNumeric>
          {res.position}
        </Td>
        <Td fontWeight="500" px={0}>
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
            {res.code ?? res.surname.substring(0, 3).toUpperCase()}
          </Box>
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

const SmallTable = ({ quali }) => {
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

const BigTable = ({ quali, cardBg }) => {
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");
  let { year } = useParams();
  // console.log(quali);
  return (
    <Table size={isLargerThan750 ? "md" : "sm"}>
      <Thead bg={cardBg}>
        <Tr>
          <Th isNumeric>#</Th>
          <Th>Driver</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
      </Thead>
      <Tbody>
        {quali.map((res) => {
          return (
            <Tr key={res.driverId}>
              <Td isNumeric>{res.position}</Td>
              <Td fontWeight="500" whiteSpace="nowrap" px={0}>
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
              <Td>
                <Badge borderRadius="full" px="2" colorScheme="yellow">
                  {res.q1}
                </Badge>
              </Td>
              <Td>
                <Badge borderRadius="full" px="2" colorScheme="green">
                  {res.q2}
                </Badge>
              </Td>
              <Td>
                <Badge borderRadius="full" px="2" colorScheme="purple">
                  {res.q3}
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
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const QualiResultsTable = ({ quali, cardBg }) => {
  const [isLargerThan585] = useMediaQuery("(min-width: 585px)");

  // console.log(quali);
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
                Qualifying
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pb={0} overflow="auto">
            {isLargerThan585 ? (
              <BigTable quali={quali} cardBg={cardBg} isLargerThan585={isLargerThan585} />
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
