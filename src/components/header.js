import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Input,
  Badge,
  Image,
} from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"}>
            <Box w="3rem">
              <Image
                src={useColorModeValue("./logo_light.png", "./logo_dark.png")}
                alt="logo"
              />
            </Box>
            <Box>StakeborgDAO Explorer</Box>
            <HStack
              as={"nav"}
              spacing={2}
              display={{ base: "none", md: "flex" }}
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
                href={"#/topholders"}
              >
                Top Holders
              </Link>

              <Link
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                //href={"/liquiditypools"}
              >
                Liquidity Pools <Badge colorScheme="green">Coming soon</Badge>
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
                Farming Pools <Badge colorScheme="green">Coming soon</Badge>
              </Link>
            </HStack>
          </HStack>

          <HStack>
            <Input placeholder="0xdeadbeef" maxW="40rem" />
          </HStack>
        </Flex>
      </Box>
    </>
  );
}
