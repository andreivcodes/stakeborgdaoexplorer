import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import {
  Container,
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Skeleton,
  Center,
  Badge,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getWalletTokens,
  getGovernanceStakedTokens,
  getGovernanceUnclaimedTokens,
  getFarmingUnclaimedTokens,
  getAirdopUnclaimedTokens,
} from "./../utils/userStats";

function Address() {
  const [wallet, setWallet] = useState(null);
  const [governanceStaking, setGovernanceStaking] = useState(null);
  const [governanceUnclaimed, setGovernanceUnclaimed] = useState(null);

  const [farmingUnclaimed, setFarmingUnclaimed] = useState(null);

  const [airdropUnclaimed, setAirdropUnclaimed] = useState(0);

  const { addr } = useParams();

  useEffect(() => {
    async function fetchData() {
      setWallet(0);
      setGovernanceStaking(0);
      setGovernanceUnclaimed(0);
      setFarmingUnclaimed(0);

      setWallet(await getWalletTokens(addr));
      setGovernanceStaking(await getGovernanceStakedTokens(addr));
      setGovernanceUnclaimed(await getGovernanceUnclaimedTokens(addr));
      setFarmingUnclaimed(await getFarmingUnclaimedTokens(addr));
      setAirdropUnclaimed(await getAirdopUnclaimedTokens(addr));
    }
    fetchData();
  }, [addr]);

  return (
    <div className="App">
      <Header />
      <Container className="pageContainer" maxW="70vw">
        <Box
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Box m="3">
            <Stat>
              <StatHelpText>Holdings of </StatHelpText>
              <StatNumber>{addr}</StatNumber>
              <StatLabel mt="2rem">💳 Wallet 💳</StatLabel>
              <StatNumber>
                {wallet ? (
                  new Intl.NumberFormat().format(wallet / 1000000000000000000)
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
                )}{" "}
                STANDARD{" "}
              </StatNumber>
              <StatLabel mt="2">⚖️ Governance staking ⚖️</StatLabel>
              <StatNumber>
                {governanceStaking ? (
                  new Intl.NumberFormat().format(
                    governanceStaking / 1000000000000000000
                  )
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
                )}{" "}
                STANDARD
              </StatNumber>
              <StatLabel mt="2">
                ⌛ ⚖️ Governance unclaimed rewards ⚖️ ⌛
              </StatLabel>
              <StatNumber>
                {governanceUnclaimed ? (
                  new Intl.NumberFormat().format(
                    governanceUnclaimed / 1000000000000000000000000000000000000
                  )
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
                )}{" "}
                STANDARD
              </StatNumber>
              <StatLabel mt="2">
                ⌛ 🚜 Farming unclaimed rewards 🚜 ⌛
              </StatLabel>
              <StatNumber>
                {farmingUnclaimed ? (
                  new Intl.NumberFormat().format(
                    farmingUnclaimed / 1000000000000000000
                  )
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
                )}{" "}
                STANDARD
              </StatNumber>
              <StatLabel mt="2">
                ⌛ ✈️ Airdrop unclaimed rewards ✈️ ⌛
              </StatLabel>
              <StatNumber>
                {airdropUnclaimed ? (
                  new Intl.NumberFormat().format(
                    airdropUnclaimed / 1000000000000000000
                  )
                ) : (
                  <Center>
                    {/* <Skeleton height="25px" width="20vw" /> */}
                    <Badge colorScheme="red">Not implemented</Badge>
                  </Center>
                )}
              </StatNumber>
              <StatLabel mt="2rem">Total</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat().format(
                  wallet / 1000000000000000000 +
                    governanceStaking / 1000000000000000000 +
                    governanceUnclaimed /
                      1000000000000000000000000000000000000 +
                    farmingUnclaimed / 1000000000000000000 +
                    airdropUnclaimed / 1000000000000000000
                )}{" "}
                STANDARD
              </StatNumber>
            </Stat>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Address;
