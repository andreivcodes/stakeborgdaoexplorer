import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usdc_contract_abi from "./../../abi/usdc.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const slp_contract_address = "0xf1e34d19f63b69eaa70952f2f64f735849959833";
const usdc_contract_address = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

const usdcContract = new web3.eth.Contract(
  usdc_contract_abi,
  usdc_contract_address
);
export default function LPTVLCard() {
  const [tvlUsdcSLP, setTvlUsdcSLP] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const usdcVal = await usdcContract.methods
        .balanceOf(slp_contract_address)
        .call();
      setTvlUsdcSLP((usdcVal / 1000000) * 2);
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
        <Stat>
          <StatLabel>USDC LP</StatLabel>
          <StatHelpText>total locked value</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(tvlUsdcSLP)} $
          </StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
