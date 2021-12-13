import {
  Stat,
  StatHelpText,
  Image,
  Center,
  Box,
  Button,
  useColorMode,
  Grid,
  GridItem,
  Text,
  Flex,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import GitInfo from "react-git-info/macro";
import githublogo from "./../github-logo.png";

function Footer() {
  const gitInfo = GitInfo();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      className="footer"
      as="footer"
      role="contentinfo"
      mx="auto"
      py="6"
      px={{ base: "4", md: "8" }}
      minWidth="100vw"
    >
      <Grid templateRows="repeat(2,auto)" templateColumns="10vw auto 10vw">
        <GridItem row="1" colSpan="3">
          <Text fontSize="sm">0x636106e4Bd34195F4678af160762cc5157bEA7e8</Text>
        </GridItem>
        <GridItem row="2" column="1" alignSelf="end" justifySelf="start">
          <Flex>
            <a href="https://github.com/andreivdev/stakeborgdaoexplorer">
              <Image
                objectFit="contain"
                boxSize="20px"
                minW="20px"
                minH="20px"
                mr="2"
                src={githublogo}
              ></Image>
            </a>
            <Text fontSize="sm">build : {gitInfo.commit.hash.slice(-6)}</Text>
          </Flex>
        </GridItem>
        <GridItem row="2" column="2">
          <Stat>
            <StatHelpText fontSize="sm">
              Like this app? Consider supporting me at the address above. It
              will help improve this app and build other apps for the
              StakeborgDAO community.
            </StatHelpText>

            <Center>
              <Image
                boxSize="25px"
                src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"
                alt="img"
              />
              <Image
                boxSize="30px"
                src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
                alt="img"
              />
              <Image
                boxSize="25px"
                src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912"
                alt="img"
              />
            </Center>
          </Stat>
        </GridItem>
        <GridItem row="2" column="3" alignSelf="end" justifySelf="end">
          <Button onClick={toggleColorMode} maxW="3rem">
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Footer;
