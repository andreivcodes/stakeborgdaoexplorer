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

  const [farmingUnclaimed_bond, setFarmingUnclaimed_bond] = useState(null);
  const [farmingUnclaimed_swingby, setFarmingUnclaimed_swingby] =
    useState(null);
  const [farmingUnclaimed_xyz, setFarmingUnclaimed_xyz] = useState(null);
  const [farmingUnclaimed_lp_usdc, setFarmingUnclaimed_lp_usdc] =
    useState(null);
  const [farmingUnclaimed_lp_ilsi, setFarmingUnclaimed_lp_ilsi] =
    useState(null);

  const [airdropUnclaimed, setAirdropUnclaimed] = useState(null);
  const [total, setTotal] = useState(null);

  const [walletLoaded, setWalletLoaded] = useState(false);
  const [governanceStakingLoaded, setGovernanceStakingLoaded] = useState(false);
  const [governanceUnclaimedLoaded, setGovernanceUnclaimedLoaded] =
    useState(false);
  const [farmingUnclaimedLoaded, setFarmingUnclaimedLoaded] = useState(false);
  const [airdropUnclaimedLoaded, setAirdropUnclaimedLoaded] = useState(false);
  const [totalLoaded, setTotalLoaded] = useState(false);

  const { addr } = useParams();

  useEffect(() => {
    setWalletLoaded(false);
    setGovernanceStakingLoaded(false);
    setGovernanceUnclaimedLoaded(false);
    setFarmingUnclaimedLoaded(false);
    setAirdropUnclaimedLoaded(false);
    setTotal(false);

    async function fetchData() {
      let user = await getUserTokens(addr);
      setWallet(user.wallet);
      setWalletLoaded(true);
      setGovernanceStaking(user.governanceStaking);
      setGovernanceStakingLoaded(true);
      setGovernanceUnclaimed(user.governanceUnclaimed);
      setGovernanceUnclaimedLoaded(true);

      setFarmingUnclaimed_bond(user.farmingUnclaimed_bond);
      setFarmingUnclaimed_swingby(user.farmingUnclaimed_swingby);
      setFarmingUnclaimed_xyz(user.farmingUnclaimed_xyz);
      setFarmingUnclaimed_lp_usdc(user.farmingUnclaimed_lp_usdc);
      setFarmingUnclaimed_lp_ilsi(user.farmingUnclaimed_lp_ilsi);

      setFarmingUnclaimed(user.farmingUnclaimed);
      setFarmingUnclaimedLoaded(true);
      setAirdropUnclaimed(user.airdropUnclaimed);
      setAirdropUnclaimedLoaded(true);
      setTotal(user.total);
      setTotalLoaded(true);
    }
    fetchData().catch((error) => alert(error.message));
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
                {farmingUnclaimedLoaded ? (
                  <div>
                    <StatHelpText>
                      {new Intl.NumberFormat().format(farmingUnclaimed_bond)} in
                      BOND farm
                    </StatHelpText>
                    <StatHelpText>
                      {new Intl.NumberFormat().format(farmingUnclaimed_swingby)}{" "}
                      in SWINGBY farm
                    </StatHelpText>
                    <StatHelpText>
                      {new Intl.NumberFormat().format(farmingUnclaimed_xyz)} in
                      XYZ farm
                    </StatHelpText>
                    <StatHelpText>
                      {new Intl.NumberFormat().format(farmingUnclaimed_lp_usdc)}{" "}
                      in USDC LP farm
                    </StatHelpText>
                    <StatHelpText>
                      {new Intl.NumberFormat().format(farmingUnclaimed_lp_ilsi)}{" "}
                      in ILSI LP farm
                    </StatHelpText>
                  </div>
                ) : null}{" "}
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
                {totalLoaded ? (
                  new Intl.NumberFormat().format(total)
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
