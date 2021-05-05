import {
  Box,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const TableRowSmall = ({ res1, res2, year, pit1, pit2 }) => {
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
          textAlign="right"
          borderBottom={0}>
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
          textAlign="right"
          borderBottom={0}>
          {res1?.time}
        </Td>
        {year > 2011 && (
          <Td
            px={1}
            py={0}
            fontSize={isSmall ? "sm" : "xs"}
            textAlign="right"
            color="blue.500"
            borderBottom={0}>
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
          textAlign="right"
          borderBottom={0}>
          {res2?.time}
        </Td>
        {year > 2011 && (
          <Td
            px={1}
            py={0}
            fontSize={isSmall ? "sm" : "xs"}
            textAlign="right"
            color="blue.500"
            borderBottom={0}>
            {pitCalc(res2?.pitMilliseconds)}
          </Td>
        )}
        <Td
          py={0}
          pl={0}
          pr={noXSmall ? 4 : 0}
          fontSize={isSmall ? "sm" : "xs"}
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right"
          borderBottom={0}>
          {dif > 0 ? `+${dif}` : dif}
        </Td>
      </Tr>
    </>
  );
};

const SmallTable = ({
  findDriver,
  lapTimes1,
  lapTimes2,
  driver1,
  driver2,
  year,
  colorMode,
}) => {
  const [noXSmall] = useMediaQuery("(min-width: 350px)");
  return (
    <Table
      size="sm"
      my={4}
      variant="striped"
      colorScheme={colorMode === "light" ? "blackAlpha" : "gray"}>
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
              <TableRowSmall
                res1={res}
                pit1={lapTimes1[index - 1]?.pitLap}
                res2={lapTimes2[index]}
                pit2={lapTimes2[index - 1]?.pitLap}
                key={uuidv4()}
                year={year}
              />
            ))
          : lapTimes2.map((res, index) => (
              <TableRowSmall
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
  );
};

const TableRowBig = ({ res1, res2, year, pit1, pit2 }) => {
  const beforeDif = (res1?.milliseconds - res2?.milliseconds) / 1000;
  const dif = beforeDif ? beforeDif.toFixed(3) : "";

  const pitCalc = (time) => {
    if (time) return (time / 1000).toFixed(3);
  };

  return (
    <>
      <Tr>
        <Td py={0} borderBottom={0} fontWeight="normal" whiteSpace="nowrap">
          {`Lap ${res1?.lap ?? res2?.lap}`}
        </Td>
        <Td
          py={0}
          color={
            dif
              ? res1.pitLap === res1.lap || pit1 === res1.lap - 1
                ? "blue.500"
                : dif < 0
                ? "green.500"
                : "red.500"
              : "gray.500"
          }
          textAlign="right"
          borderBottom={0}>
          {res1?.time}
        </Td>
        {year > 2011 && (
          <Td py={0} textAlign="right" color="blue.500" borderBottom={0}>
            {pitCalc(res1?.pitMilliseconds)}
          </Td>
        )}
        <Td
          py={0}
          color={
            dif
              ? res2.pitLap === res2.lap || pit2 === res2.lap - 1
                ? "blue.500"
                : dif > 0
                ? "green.500"
                : "red.500"
              : "gray.500"
          }
          textAlign="right"
          borderBottom={0}>
          {res2?.time}
        </Td>
        {year > 2011 && (
          <Td py={0} textAlign="right" color="blue.500" borderBottom={0}>
            {pitCalc(res2?.pitMilliseconds)}
          </Td>
        )}
        <Td
          py={0}
          color={dif ? (dif < 0 ? "green.500" : "red.500") : "gray.500"}
          textAlign="right"
          borderBottom={0}>
          {dif > 0 ? `+${dif}` : dif}
        </Td>
      </Tr>
    </>
  );
};

const BigTable = ({
  findDriver,
  lapTimes1,
  lapTimes2,
  driver1,
  driver2,
  year,
  colorMode,
}) => {
  return (
    <Table
      size="md"
      my={4}
      variant="striped"
      colorScheme={colorMode === "light" ? "blackAlpha" : "gray"}>
      <Thead>
        <Tr>
          <Th w="99%">#</Th>
          <Th textAlign="right">{findDriver(driver1)}</Th>
          {year > 2011 && <Th textAlign="right">Pit</Th>}
          <Th textAlign="right">{findDriver(driver2)}</Th>
          {year > 2011 && <Th textAlign="right">Pit</Th>}
          <Th textAlign="right">+/-</Th>
        </Tr>
      </Thead>
      <Tbody fontWeight="semibold">
        {lapTimes1.length >= lapTimes2.length
          ? lapTimes1.map((res, index) => (
              <TableRowBig
                res1={res}
                pit1={lapTimes1[index - 1]?.pitLap}
                res2={lapTimes2[index]}
                pit2={lapTimes2[index - 1]?.pitLap}
                key={uuidv4()}
                year={year}
              />
            ))
          : lapTimes2.map((res, index) => (
              <TableRowBig
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
          <Th>#</Th>
          <Th textAlign="right">{findDriver(driver1)}</Th>
          {year > 2011 && <Th textAlign="right">Pit</Th>}
          <Th textAlign="right">{findDriver(driver2)}</Th>
          {year > 2011 && <Th textAlign="right">Pit</Th>}
          <Th textAlign="right">+/-</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

const HthTable = ({ lapTimes1, lapTimes2, driver1, driver2, drivers, year }) => {
  const [bigTable] = useMediaQuery("(min-width: 768px)");
  const { colorMode } = useColorMode();
  const findDriver = (driverToFind) => {
    const found = drivers.find((driver) => driver.driverId === driverToFind);
    let toReturn;

    if (bigTable) {
      toReturn = `${found.forename} ${found.surname}`;
    } else if (found.code !== null) {
      toReturn = found.code;
    } else {
      toReturn = found.surname.substring(0, 3).toUpperCase();
    }

    return toReturn;
  };

  return (
    <>
      <Box align="center" borderWidth="0px" borderColor="white" overflow="auto">
        {bigTable ? (
          <BigTable
            findDriver={findDriver}
            lapTimes1={lapTimes1}
            lapTimes2={lapTimes2}
            driver1={driver1}
            driver2={driver2}
            year={year}
            colorMode={colorMode}
          />
        ) : (
          <SmallTable
            findDriver={findDriver}
            lapTimes1={lapTimes1}
            lapTimes2={lapTimes2}
            driver1={driver1}
            driver2={driver2}
            year={year}
            colorMode={colorMode}
          />
        )}
      </Box>
    </>
  );
};

export default HthTable;
