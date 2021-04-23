import { Box, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { uuid } from "uuidv4";

const TableRow = ({ res1, res2 }) => {
  const beforeDif = (res1?.milliseconds - res2?.milliseconds) / 1000;
  const dif = beforeDif ? beforeDif.toFixed(3) : "";

  const pitCalc = (time) => {
    if (time) return (time / 1000).toFixed(3);
  };

  return (
    <>
      <Tr bg="gray.100">
        <Td p={0} fontSize="sm" textAlign="right">
          {res1?.lap ?? res2?.lap}
        </Td>
        <Td
          py={0}
          px={1}
          fontSize="sm"
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {res1?.time}
        </Td>
        <Td px={1} py={0} fontSize="sm" textAlign="right" color="blue.500">
          {pitCalc(res1?.pitMilliseconds)}
        </Td>
        <Td
          p={0}
          fontSize="sm"
          color={dif ? (dif > 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {res2?.time}
        </Td>
        <Td px={1} py={0} fontSize="sm" textAlign="right" color="blue.500">
          {pitCalc(res2?.pitMilliseconds)}
        </Td>
        <Td
          p={0}
          fontSize="sm"
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
        overflow="auto"
        bg="gray.100">
        <Table size="sm" variant="unstyled" my={4}>
          <Thead bg="gray.100">
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
          <Tfoot bg="gray.100">
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
