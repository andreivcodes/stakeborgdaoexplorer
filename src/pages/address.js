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
import { getUserTokens } from "./../utils/userStats";

function Address() {
  const [wallet, setWallet] = useState(null);
  const [governanceStaking, setGovernanceStaking] = useState(null);
  const [governanceUnclaimed, setGovernanceUnclaimed] = useState(null);
  const [farmingUnclaimed, setFarmingUnclaimed] = useState(null);
  const [airdropUnclaimed, setAirdropUnclaimed] = useState(null);

  const [walletLoaded, setWalletLoaded] = useState(false);
  const [governanceStakingLoaded, setGovernanceStakingLoaded] = useState(false);
  const [governanceUnclaimedLoaded, setGovernanceUnclaimedLoaded] =
    useState(false);
  const [farmingUnclaimedLoaded, setFarmingUnclaimedLoaded] = useState(false);
  const [airdropUnclaimedLoaded, setAirdropUnclaimedLoaded] = useState(false);

  const { addr } = useParams();

  useEffect(() => {
    setWalletLoaded(false);
    setGovernanceStakingLoaded(false);
    setGovernanceUnclaimedLoaded(false);
    setFarmingUnclaimedLoaded(false);
    setAirdropUnclaimedLoaded(false);

    async function fetchData() {
      let user = await getUserTokens(addr);
      setWallet(user.wallet);
      setWalletLoaded(true);
      setGovernanceStaking(user.governanceStaking);
      setGovernanceStakingLoaded(true);
      setGovernanceUnclaimed(user.governanceUnclaimed);
      setGovernanceUnclaimedLoaded(true);
      setFarmingUnclaimed(user.farmingUnclaimed);
      setFarmingUnclaimedLoaded(true);
      setAirdropUnclaimed(user.airdropUnclaimed);
      setAirdropUnclaimedLoaded(true);

      console.log(user);
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
                {walletLoaded ? (
                  new Intl.NumberFormat().format(wallet)
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
                )}{" "}
                STANDARD{" "}
              </StatNumber>
              <StatLabel mt="2">⚖️ Governance staking ⚖️</StatLabel>
              <StatNumber>
                {governanceStakingLoaded ? (
                  new Intl.NumberFormat().format(governanceStaking)
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
                {governanceUnclaimedLoaded ? (
                  new Intl.NumberFormat().format(governanceUnclaimed)
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
                {farmingUnclaimedLoaded ? (
                  new Intl.NumberFormat().format(farmingUnclaimed)
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
                {/* {airdropUnclaimedLoaded ? (
                  new Intl.NumberFormat().format(
                    airdropUnclaimed / 1000000000000000000
                  )
                ) : ( */}
                <Center>
                  {/* <Skeleton height="25px" width="20vw" /> */}
                  <Badge colorScheme="red">Not implemented</Badge>
                </Center>
                {/* )} */}
              </StatNumber>
              <StatLabel mt="2rem">Total</StatLabel>
              <StatNumber>
                {walletLoaded &&
                governanceStakingLoaded &&
                governanceUnclaimedLoaded &&
                farmingUnclaimedLoaded &&
                airdropUnclaimedLoaded ? (
                  new Intl.NumberFormat().format(
                    wallet +
                      governanceStaking +
                      governanceUnclaimed +
                      farmingUnclaimed +
                      airdropUnclaimed
                  )
                ) : (
                  <Center>
                    <Skeleton height="25px" width="20vw" />
                  </Center>
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
