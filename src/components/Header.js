import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { Link as ReachLink } from "react-router-dom";

const Links = [
  // { name: "Last Race", url: "/last-race" },
  { name: "All Seasons", url: "/seasons" },
  { name: "2021 Season", url: "/season/2021" },
];

const NavLink = ({ children, onClose, isOpen }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      as={ReachLink}
      to={children.url}
      onClick={isOpen ? onClose : null}>
      {children.name}
    </Link>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { ref, inView } = useInView();

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        as={"header"}
        position="sticky"
        top="0"
        zIndex="3"
        boxShadow={!inView && "sm"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={4}
          height="72px">
          <HStack spacing={8} alignItems={"center"}>
            <Box fontWeight="600" as={ReachLink} to="/seasons" onClick={onClose}>
              LapByLap
            </Box>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack>
            <IconButton
              size={"md"}
              icon={colorMode !== "dark" ? <MoonIcon /> : <SunIcon />}
              display="inline-block"
              aria-label={"Mode"}
              onClick={toggleColorMode}
              bg={useColorModeValue("white", "gray.800")}
            />
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: !isOpen ? "none" : "inherit" }}
              onClick={isOpen ? onClose : onOpen}
              bg={useColorModeValue("white", "gray.800")}
            />
          </HStack>
        </Flex>

        <Collapse in={isOpen}>
          <Box pb={4} pt={1} px={4}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.url} onClose={onClose} isOpen={isOpen}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Box>
      <Box ref={ref}></Box>
    </>
  );
}
