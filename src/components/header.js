import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Badge,
  Image,
  useDisclosure,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import lightLogo from "./../logo_light.png";
import darkLogo from "./../logo_dark.png";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex p="2" alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack alignItems={"center"}>
            <Box w="2rem">
              <Image src={useColorModeValue(lightLogo, darkLogo)} alt="logo" />
            </Box>
            <Box display={{ base: "none", lg: "flex" }}>
              StakeborgDAO Explorer
            </Box>
            <HStack
              as={"nav"}
              spacing={2}
              display={{ base: "none", lg: "flex" }}
              px={8}
            >
              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#/"}
              >
                Home
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#/fees"}
              >
                Gas fees estimation
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#/governance"}
              >
                Governance
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                href={"#/ilsistats"}
              >
                ILSI Stats <Badge colorScheme="green">New</Badge>
              </Link>

              {/*  <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                //href={"/liquiditypools"}
              >
                Liquidity Pools <Badge colorScheme="red">Coming soon</Badge>
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                //href={"/farmingpools"}
              >
                Farming Pools <Badge colorScheme="red">Coming soon</Badge>
              </Link> */}
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href={"#/"}>Home</Link>

              <Link href={"#/fees"}>Gas fees estimation</Link>

              <Link href={"#/governance"}>Governance</Link>

              <Link href={"#/ilsistats"}>
                ILSI Stats <Badge colorScheme="green">New</Badge>
              </Link>

              {/* <Link
              //  href={"#/liquiditypools"} 
              >
                Liquidity Pools <Badge colorScheme="red">Coming soon</Badge>
              </Link>

              <Link
              //  href={"#/farmingpools"} 
              >
                Farming Pools <Badge colorScheme="red">Coming soon</Badge>
              </Link>
               */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
