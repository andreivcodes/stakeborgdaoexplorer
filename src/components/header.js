import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
  Input,
  Badge,
  Image,
  useDisclosure,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import lightLogo from "./../logo_light.png";
import darkLogo from "./../logo_dark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack alignItems={"center"}>
            <Box w="2rem">
              <Image src={useColorModeValue(lightLogo, darkLogo)} alt="logo" />
            </Box>
            <Box display={{ base: "none", md: "flex" }}>
              StakeborgDAO Explorer
            </Box>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/address/" + value);
              }}
            >
              <Input
                placeholder="0xdeadbeef"
                maxW="40rem"
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
              />
              <button type="submit"></button>
            </form>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href={"#/"}>Home</Link>

              <Link href={"#/topholders"}>Top Holders</Link>

              <Link /* href={"#/liquiditypools"} */>
                Liquidity Pools <Badge colorScheme="green">Coming soon</Badge>
              </Link>

              <Link /* href={"#/farmingpools"} */>
                Farming Pools <Badge colorScheme="green">Coming soon</Badge>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
