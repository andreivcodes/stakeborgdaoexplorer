import {
  Stat,
  StatLabel,
  Box,
  useColorModeValue,
  StatHelpText,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import sushiswap_abi from "../../../abi/sushiswap.json";

const sushi_contract_address = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

let sushiswap_contract = new web3.eth.Contract(
  sushiswap_abi,
  sushi_contract_address
);

export default function BuyingFee(props) {
  const [gas1, setGas1] = useState(0);
  const [gas1dec, setGas1dec] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!props.gasPrice || !props.ethPrice) return;

      var now = Math.round(new Date().getTime() / 1000) + 1000;
      let address = props.address;
      if (!props.address)
        address = "0x000000000000000000000000000000000000dEaD";

      let gas4 = 0;

      sushiswap_contract.methods
        .swapExactETHForTokens(
          "1",
          [
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "0xDA0c94c73D127eE191955FB46bACd7FF999b2bcd",
          ],
          address,
          now
        )
        .estimateGas(
          { from: address, value: "1000000000" },
          function (err, gas) {
            if (err) {
              let gas1 =
                (190000 * props.gasPrice * props.ethPrice) / 1000000000;
              gas4 = gas4 + gas1;
              setGas1(Math.floor(gas1));
              setGas1dec(gas1.toString().split(".")[1].slice(0, 2));
            } else {
              let gas1 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
              gas4 = gas4 + gas1;
              setGas1(Math.floor(gas1));
              setGas1dec(gas1.toString().split(".")[1].slice(0, 2));
            }
          }
        );
    }
    fetchData();
  }, [props]);

  return (
    <Box
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel fontSize="m">Buying fee</StatLabel>
          <Box>
            <Box px="2">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="xl">{gas1}</Text>.
                <Text fontSize="sm">{gas1dec}</Text>
                <Text fontSize="xl">&nbsp;$</Text>
              </Flex>
              <StatHelpText fontSize="sm">Swap ETH to STANDARD</StatHelpText>
            </Box>
          </Box>
        </Stat>
      </Box>
    </Box>
  );
}
