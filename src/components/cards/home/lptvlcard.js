import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usdc_contract_abi from "./../../../abi/usdc.json";
import weth_contract_abi from "./../../../abi/weth.json";
import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_RPC));

const usdc_slp_contract_address = "0xf1e34d19f63b69eaa70952f2f64f735849959833";
const ilsi_slp_contract_address = "0x753f33c13fe44d41a8cc6ac202a6de6c53c58b6a";
const usdc_contract_address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const weth_contract_address = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

const usdcContract = new web3.eth.Contract(
  usdc_contract_abi,
  usdc_contract_address
);

const wethContract = new web3.eth.Contract(
  weth_contract_abi,
  weth_contract_address
);
export default function LPTVLCard() {
  const [tvlUsdcSLP, setTvlUsdcSLP] = useState(0);
  const [tvlIlsiSLP, setTvlIlsiSLP] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const usdcValInUSDCSLP = await usdcContract.methods
        .balanceOf(usdc_slp_contract_address)
        .call();
      setTvlUsdcSLP((usdcValInUSDCSLP / 1000000) * 2);

      const wethValInILSISLP = await wethContract.methods
        .balanceOf(ilsi_slp_contract_address)
        .call();

      let ethPrice = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum?market_data=true"
        )
      ).json();

      setTvlIlsiSLP(
        ((ethPrice["market_data"]["current_price"]["usd"] * wethValInILSISLP) /
          1000000000000000000) *
          2
      );
    }
    fetchData();
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
          <Stat>
            <StatLabel>USDC LP</StatLabel>
            <StatHelpText>total locked value</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(tvlUsdcSLP.toFixed(2))} $
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>ILSI LP</StatLabel>
            <StatHelpText>total locked value</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(tvlIlsiSLP.toFixed(2))} $
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
}
