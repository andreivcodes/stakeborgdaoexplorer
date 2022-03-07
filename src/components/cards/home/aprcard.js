import {
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import governance_staking_abi from "../../../abi/governance_staking.json";
import usdc_contract_abi from "../../../abi/usdc.json";
import weth_contract_abi from "../../../abi/weth.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const governance_staking_dao_contract_adress =
  "0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C";

const farms_contract_address = "0x7F4FE6776a9617847485d43db0d3A9b734e459C5";

const usdc_slp_contract_address = "0xf1e34d19f63b69eaa70952f2f64f735849959833";
const ilsi_slp_contract_address = "0x753f33c13fe44d41a8cc6ac202a6de6c53c58b6a";
const usdc_contract_address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const weth_contract_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

let governance_staking_contract = new web3.eth.Contract(
  governance_staking_abi,
  governance_staking_dao_contract_adress
);

const usdcContract = new web3.eth.Contract(
  usdc_contract_abi,
  usdc_contract_address
);

const wethContract = new web3.eth.Contract(
  weth_contract_abi,
  weth_contract_address
);

export default function APRCardAPRCard() {
  const [governanceAPY, setGovernanceAPY] = useState(0);
  const [USDCAPY, setUSDCAPY] = useState(0);
  const [ILSIAPY, setILSIAPY] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let govTotalStaked =
        await governance_staking_contract.methods.stakeborgTokenStaked
          .call()
          .call();
      setGovernanceAPY(
        Number((1000000000000000000 / govTotalStaked) * 22400 * 100 * 52.1429)
      );

      let STANDARDPrice = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/stakeborg-dao?market_data=true"
        )
      ).json();

      const usdcValInUSDCSLP = await usdcContract.methods
        .balanceOf(usdc_slp_contract_address)
        .call();

      let USDCTVLinSTANDARD =
        ((usdcValInUSDCSLP / 1000000) * 2) /
        STANDARDPrice["market_data"]["current_price"]["usd"];

      setUSDCAPY((19200 / USDCTVLinSTANDARD) * 100 * 52.1429);

      const wethValInILSISLP = await wethContract.methods
        .balanceOf(ilsi_slp_contract_address)
        .call();

      let ethPrice = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum?market_data=true"
        )
      ).json();

      let ILSITVLinSTANDARD =
        (((ethPrice["market_data"]["current_price"]["usd"] * wethValInILSISLP) /
          1000000000000000000) *
          2) /
        STANDARDPrice["market_data"]["current_price"]["usd"];

      setILSIAPY((15000 / ILSITVLinSTANDARD) * 100 * 52.1429);
    }
    fetchData().catch((error) => alert(error.message));
  }, []);
  return (
    <Box
      boxShadow="base"
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <StatGroup>
          <Stat p={4}>
            <StatLabel>Governance Staking APR</StatLabel>
            <StatNumber>
              {new Intl.NumberFormat().format(governanceAPY.toFixed(1))} %
            </StatNumber>
          </Stat>

          <Stat p={4}>
            <StatLabel>USDC LP Staking APR</StatLabel>
            <StatNumber>
              {new Intl.NumberFormat().format(USDCAPY.toFixed(1))} %
            </StatNumber>
          </Stat>

          <Stat p={4}>
            <StatLabel>ILSI LP Staking APR</StatLabel>
            <StatNumber>
              {new Intl.NumberFormat().format(ILSIAPY.toFixed(1))} %
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
}
