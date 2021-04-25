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
import { v4 as uuidv4 } from "uuid";

const TableRow = ({ res1, res2, year, pit1, pit2 }) => {
  const [isSmall] = useMediaQuery("(min-width: 400px)");
  const [noXSmall] = useMediaQuery("(min-width: 350px)");

  const beforeDif = (res1?.milliseconds - res2?.milliseconds) / 1000;
  const dif = beforeDif ? beforeDif.toFixed(3) : "";

  const pitCalc = (time) => {
    if (time) return (time / 1000).toFixed(3);
  };

  return (
    <>
      <Tr>
        <Td
          py={0}
          pl={noXSmall ? 4 : 0}
          pr={0}
          fontSize={isSmall ? "sm" : "xs"}
          textAlign="right">
          {res1?.lap ?? res2?.lap}
        </Td>
        <Td
          py={0}
          px={1}
          fontSize={isSmall ? "sm" : "xs"}
          color={
            dif
              ? res1.pitLap === res1.lap || pit1 === res1.lap - 1
                ? "blue.500"
                : dif < 0
                ? "green.500"
                : "red.500"
              : "gray.500"
          }
          textAlign="right">
          {res1?.time}
        </Td>
        {year > 2011 && (
          <Td
            px={1}
            py={0}
            fontSize={isSmall ? "sm" : "xs"}
            textAlign="right"
            color="blue.500">
            {pitCalc(res1?.pitMilliseconds)}
          </Td>
        )}
        <Td
          p={0}
          fontSize={isSmall ? "sm" : "xs"}
          color={
            dif
              ? res2.pitLap === res2.lap || pit2 === res2.lap - 1
                ? "blue.500"
                : dif > 0
                ? "green.500"
                : "red.500"
              : "gray.500"
          }
          textAlign="right">
          {res2?.time}
        </Td>
        {year > 2011 && (
          <Td
            px={1}
            py={0}
            fontSize={isSmall ? "sm" : "xs"}
            textAlign="right"
            color="blue.500">
            {pitCalc(res2?.pitMilliseconds)}
          </Td>
        )}
        <Td
          py={0}
          pl={0}
          pr={noXSmall ? 4 : 0}
          fontSize={isSmall ? "sm" : "xs"}
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right">
          {dif > 0 ? `+${dif}` : dif}
        </Td>
      </Tr>
    </>
  );
};

const HthTable = ({ lapTimes1, lapTimes2, driver1, driver2, drivers, year }) => {
  const [noXSmall] = useMediaQuery("(min-width: 350px)");
  const [mediumTable] = useMediaQuery("(min-width: 768px)");
  const findDriver = (driverToFind) => {
    const found = drivers.find((driver) => driver.driverId === driverToFind);
    let toReturn;

    if (found.code !== null) {
      toReturn = found.code;
    } else {
      toReturn = found.surname.substring(0, 3).toUpperCase();
    }
    return toReturn;
  };

  return (
    <>
      <Box
        align="center"
        width={["91vw", "91vw", "91vw", "91vw", "80vw"]}
        borderRadius="lg"
        borderWidth="0px"
        borderColor="white"
        overflow="auto">
        <Table size="sm" variant="unstyled" my={4}>
          <Thead>
            <Tr>
              <Th textAlign="right" py={0} pl={noXSmall ? 4 : 0} pr={0}>
                #
              </Th>
              <Th textAlign="right" p={0}>
                {findDriver(driver1)}
              </Th>
              {year > 2011 && (
                <Th textAlign="right" p={0}>
                  Pit
                </Th>
              )}
              <Th textAlign="right" p={0}>
                {findDriver(driver2)}
              </Th>
              {year > 2011 && (
                <Th textAlign="right" p={0}>
                  Pit
                </Th>
              )}
              <Th textAlign="right" py={0} pr={noXSmall ? 4 : 0} pl={0}>
                +/-
              </Th>
            </Tr>
          </Thead>
          <Tbody fontWeight="semibold">
            {lapTimes1.length >= lapTimes2.length
              ? lapTimes1.map((res, index) => (
                  <TableRow
                    res1={res}
                    pit1={lapTimes1[index - 1]?.pitLap}
                    res2={lapTimes2[index]}
                    pit2={lapTimes2[index - 1]?.pitLap}
                    key={uuidv4()}
                    year={year}
                  />
                ))
              : lapTimes2.map((res, index) => (
                  <TableRow
                    res1={lapTimes1[index]}
                    pit1={lapTimes1[index - 1]?.pitLap}
                    res2={res}
                    pit2={lapTimes2[index - 1]?.pitLap}
                    key={uuidv4()}
                    year={year}
                  />
                ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th textAlign="right" py={0} pl={noXSmall ? 4 : 0} pr={0}>
                #
              </Th>
              <Th textAlign="right" p={0}>
                {findDriver(driver1)}
              </Th>
              {year > 2011 && (
                <Th textAlign="right" p={0}>
                  Pit
                </Th>
              )}
              <Th textAlign="right" p={0}>
                {findDriver(driver2)}
              </Th>
              {year > 2011 && (
                <Th textAlign="right" p={0}>
                  Pit
                </Th>
              )}
              <Th textAlign="right" py={0} pr={noXSmall ? 4 : 0} pl={0}>
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
