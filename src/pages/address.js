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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import standard_token_abi from "./../abi/standard_token.json";
import governance_staking_abi from "./../abi/governance_staking.json";
import governance_rewards_abi from "./../abi/governance_rewards.json";
import yieldfarmtoken_bond_abi from "./../abi/yieldfarmtoken_bond.json";
import yieldfarmtoken_swingby_abi from "./../abi/yieldfarmtoken_swingby.json";
import yieldfarmtoken_xyz_abi from "./../abi/yieldfarmtoken_xyz.json";
import yieldstaking_abi from "./../abi/yieldstaking.json";

import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/6a64571b9f134bc1913c6c24d5698891"
  )
);

const standard_contract_address = "0xda0c94c73d127ee191955fb46bacd7ff999b2bcd";

const BOND_contract_address = "0x0391D2021f89DC339F60Fff84546EA23E337750f";
const SWINGBY_contract_address = "0x8287c7b963b405b7b8d467db9d79eec40625b13a";
const XYZ_contract_address = "0x618679df9efcd19694bb1daa8d00718eacfa2883";

const governance_staking_dao_contract_adress =
  "0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C";
const governance_rewards_contract_address =
  "0xF6b67E11A8B9844937700c0BAadC460DCD074802";

const yield_staking_contract_address =
  "0x7f4fe6776a9617847485d43db0d3a9b734e459c5";

const yield_farm_bond_contract_address =
  "0x2b31D07A2625a2fBAe68feed5a818ffc00dFB21b";

const yield_farm_swingby_contract_address =
  "0xab0a722e5e8e6ea4299fe0cbed7f62c2a904267a";

const yield_farm_xyz_contract_address =
  "0x2b89b42a95676dc74013ece6c07a760df5709c5c";

const standard_contract = new web3.eth.Contract(
  standard_token_abi,
  standard_contract_address
);

const governance_staking_contract = new web3.eth.Contract(
  governance_staking_abi,
  governance_staking_dao_contract_adress
);

const governance_rewards_contract = new web3.eth.Contract(
  governance_rewards_abi,
  governance_rewards_contract_address
);

const yield_staking_contract = new web3.eth.Contract(
  yieldstaking_abi,
  yield_staking_contract_address
);

const yield_unclaimed_bond_contract = new web3.eth.Contract(
  yieldfarmtoken_bond_abi,
  yield_farm_bond_contract_address
);

const yield_unclaimed_swingby_contract = new web3.eth.Contract(
  yieldfarmtoken_swingby_abi,
  yield_farm_swingby_contract_address
);

const yield_unclaimed_xyz_contract = new web3.eth.Contract(
  yieldfarmtoken_xyz_abi,
  yield_farm_xyz_contract_address
);

function Address() {
  const [wallet, setWallet] = useState(null);
  const [governanceStaking, setGovernanceStaking] = useState(null);
  const [governanceUnclaimed, setGovernanceUnclaimed] = useState(null);

  const [farmingUnclaimed, setFarmingUnclaimed] = useState(null);

  const { addr } = useParams();

  useEffect(() => {
    async function fetchData() {
      setWallet(0);
      setGovernanceStaking(0);
      setGovernanceUnclaimed(0);
      setFarmingUnclaimed(0);

      setWallet(await standard_contract.methods.balanceOf(addr).call());
      setGovernanceStaking(
        await governance_staking_contract.methods.balanceOf(addr).call()
      );

      let userMultiplierGov = await governance_rewards_contract.methods
        .userMultiplier(addr)
        .call();

      let currentMultiplierGov = await governance_rewards_contract.methods
        .currentMultiplier()
        .call();

      let multiplier = currentMultiplierGov - userMultiplierGov;

      let pendingRewardsGov =
        (await governance_staking_contract.methods.balanceOf(addr).call()) *
        multiplier;

      setGovernanceUnclaimed(pendingRewardsGov);

      let currentEpoch = await await yield_staking_contract.methods
        .getCurrentEpoch()
        .call();

      let total_pending_farm = 0;

      for (let epoch = 1; epoch <= currentEpoch; epoch++) {
        let totalDistributedAmount =
          await yield_unclaimed_bond_contract.methods.totalDistributedAmount
            .call()
            .call();

        let numberOfEpochs =
          await yield_unclaimed_bond_contract.methods.numberOfEpochs
            .call()
            .call();

        let currentEpoch = epoch;

        let getEpochUserBalance = await yield_staking_contract.methods
          .getEpochUserBalance(addr, BOND_contract_address, currentEpoch)
          .call();

        let getEpochPoolSize = await yield_staking_contract.methods
          .getEpochPoolSize(BOND_contract_address, currentEpoch)
          .call();

        total_pending_farm += Number(
          ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
            getEpochPoolSize /
            1000000000000000000
        );

        console.log(total_pending_farm);

        console.log(
          "pending bond " +
            ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
              getEpochPoolSize /
              1000000000000000000
        );
      }

      for (let epoch = 1; epoch <= currentEpoch; epoch++) {
        let totalDistributedAmount =
          await yield_unclaimed_swingby_contract.methods.totalDistributedAmount
            .call()
            .call();

        let numberOfEpochs =
          await yield_unclaimed_swingby_contract.methods.numberOfEpochs
            .call()
            .call();

        let currentEpoch = epoch;

        let getEpochUserBalance = await yield_staking_contract.methods
          .getEpochUserBalance(addr, SWINGBY_contract_address, currentEpoch)
          .call();

        let getEpochPoolSize = await yield_staking_contract.methods
          .getEpochPoolSize(SWINGBY_contract_address, currentEpoch)
          .call();

        total_pending_farm += Number(
          ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
            getEpochPoolSize /
            1000000000000000000
        );

        console.log(total_pending_farm);

        console.log(
          "pending swingby " +
            ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
              getEpochPoolSize /
              1000000000000000000
        );
      }

      for (let epoch = 1; epoch <= currentEpoch; epoch++) {
        let totalDistributedAmount =
          await yield_unclaimed_xyz_contract.methods.totalDistributedAmount
            .call()
            .call();

        let numberOfEpochs =
          await yield_unclaimed_xyz_contract.methods.numberOfEpochs
            .call()
            .call();

        let currentEpoch = epoch;

        let getEpochUserBalance = await yield_staking_contract.methods
          .getEpochUserBalance(addr, XYZ_contract_address, currentEpoch)
          .call();

        let getEpochPoolSize = await yield_staking_contract.methods
          .getEpochPoolSize(XYZ_contract_address, currentEpoch)
          .call();

        total_pending_farm += Number(
          ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
            getEpochPoolSize /
            1000000000000000000
        );

        console.log(total_pending_farm);

        console.log(
          "pending xyz " +
            ((totalDistributedAmount / numberOfEpochs) * getEpochUserBalance) /
              getEpochPoolSize /
              1000000000000000000
        );
      }

      setFarmingUnclaimed(total_pending_farm);
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
              <StatNumber>123</StatNumber>
              <StatLabel mt="2rem">Total</StatLabel>
              <StatNumber>123</StatNumber>
            </Stat>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Address;
