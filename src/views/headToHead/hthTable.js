import {
  Box,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from "@chakra-ui/react";
import { uuid } from "uuidv4";

const TableRow = ({ res1, res2 }) => {
  const [isSmall] = useMediaQuery("(min-width: 400px)");

  const beforeDif = (res1?.milliseconds - res2?.milliseconds) / 1000;
  const dif = beforeDif ? beforeDif.toFixed(3) : "";

  const pitCalc = (time) => {
    if (time) return (time / 1000).toFixed(3);
  };

  return (
    <>
      <Tr>
        <Td p={0} fontSize={isSmall ? "sm" : "xs"} textAlign="right">
          {res1?.lap ?? res2?.lap}
        </Td>
        <Td
          py={0}
          px={1}
          fontSize={isSmall ? "sm" : "xs"}
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {res1?.time}
        </Td>
        <Td
          px={1}
          py={0}
          fontSize={isSmall ? "sm" : "xs"}
          textAlign="right"
          color="blue.500">
          {pitCalc(res1?.pitMilliseconds)}
        </Td>
        <Td
          p={0}
          fontSize={isSmall ? "sm" : "xs"}
          color={dif ? (dif > 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {res2?.time}
        </Td>
        <Td
          px={1}
          py={0}
          fontSize={isSmall ? "sm" : "xs"}
          textAlign="right"
          color="blue.500">
          {pitCalc(res2?.pitMilliseconds)}
        </Td>
        <Td
          p={0}
          fontSize={isSmall ? "sm" : "xs"}
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {dif > 0 ? `+${dif}` : dif}
        </Td>
      </Tr>
    </>
  );
};

const HthTable = ({ lapTimes1, lapTimes2, driver1, driver2, drivers }) => {
  //   console.log(lapTimes1, lapTimes2);

  return (
    <>
      <Box
        align="center"
        width="91vw"
        borderRadius="lg"
        borderWidth="0px"
        borderColor="white"
        overflow="auto">
        <Table size="sm" variant="unstyled" my={4}>
          <Thead>
            <Tr>
              <Th textAlign="right" p={0}>
                #
              </Th>
              <Th textAlign="right" p={0}>
                {drivers.find((driver) => driver.driverId === driver1)?.code}
              </Th>
              <Th textAlign="right" p={0}>
                Pit
              </Th>
              <Th textAlign="right" p={0}>
                {drivers.find((driver) => driver.driverId === driver2)?.code}
              </Th>
              <Th textAlign="right" p={0}>
                Pit
              </Th>
              <Th textAlign="right" p={0}>
                +/-
              </Th>
            </Tr>
          </Thead>
          <Tbody fontWeight="semibold">
            {lapTimes1.length > lapTimes2.length
              ? lapTimes1.map((res, index) => (
                  <TableRow res1={res} res2={lapTimes2[index]} key={uuid()} />
                ))
              : lapTimes2.map((res, index) => (
                  <TableRow res1={lapTimes1[index]} res2={res} key={uuid()} />
                ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign="right" p={0}>
                #
              </Th>
              <Th textAlign="right" p={0}>
                {drivers.find((driver) => driver.driverId === driver1)?.code}
              </Th>
              <Th textAlign="right" p={0}>
                Pit
              </Th>
              <Th textAlign="right" p={0}>
                {drivers.find((driver) => driver.driverId === driver2)?.code}
              </Th>
              <Th textAlign="right" p={0}>
                Pit
              </Th>
              <Th textAlign="right" p={0}>
                +/-
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </>
  );
};

export default HthTable;
