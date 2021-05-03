import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt={6}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}>
        <Text>© 2021 LapByLap. All rights reserved</Text>
      </Container>
    </Box>
  );
}
