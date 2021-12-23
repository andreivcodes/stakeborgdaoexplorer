import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
  StatHelpText,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import sushiswap_abi from "./../../../abi/sushiswap.json";
import standard_abi from "./../../../abi/standard_token.json";
import governance_staking_abi from "./../../../abi/governance_staking.json";

const sushi_contract_address = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
const standard_contract_address = "0xda0c94c73d127ee191955fb46bacd7ff999b2bcd";
const governance_staking_dao_contract_adress =
  "0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

let sushiswap_contract = new web3.eth.Contract(
  sushiswap_abi,
  sushi_contract_address
);

let standard_contract = new web3.eth.Contract(
  standard_abi,
  standard_contract_address
);

let governance_staking_contract = new web3.eth.Contract(
  governance_staking_abi,
  governance_staking_dao_contract_adress
);

export default function StakingFee(props) {
  const [gas1, setGas1] = useState(0);
  const [gas2, setGas2] = useState(0);
  const [gas3, setGas3] = useState(0);
  const [gas4, setGas4] = useState(0);
  const [gas1dec, setGas1dec] = useState("");
  const [gas2dec, setGas2dec] = useState("");
  const [gas3dec, setGas3dec] = useState("");
  const [gas4dec, setGas4dec] = useState("");

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
            setGas4(Math.floor(gas4));
            setGas4dec(gas4.toString().split(".")[1].slice(0, 2));
          }
        );

      await standard_contract.methods
        .approve("0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C", 100)
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas2 = (46506 * props.gasPrice * props.ethPrice) / 1000000000;
            gas4 = gas4 + gas2;
            setGas2(Math.floor(gas2));
            setGas2dec(gas2.toString().split(".")[1].slice(0, 2));
          } else {
            let gas2 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            gas4 = gas4 + gas2;
            setGas2(Math.floor(gas2));
            setGas2dec(gas2.toString().split(".")[1].slice(0, 2));
          }
          setGas4(Math.floor(gas4));
          setGas4dec(gas4.toString().split(".")[1].slice(0, 2));
        });

      await governance_staking_contract.methods
        .deposit(1)
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas3 = (295000 * props.gasPrice * props.ethPrice) / 1000000000;
            gas4 = gas4 + gas3;
            setGas3(Math.floor(gas3));
            setGas3dec(gas3.toString().split(".")[1].slice(0, 2));
          } else {
            let gas3 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            gas4 = gas4 + gas3;
            setGas3(Math.floor(gas3));
            setGas3dec(gas3.toString().split(".")[1].slice(0, 2));
          }
          setGas4(Math.floor(gas4));
          setGas4dec(gas4.toString().split(".")[1].slice(0, 2));
        });
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
          <StatLabel fontSize="m">Staking process fee</StatLabel>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas1}</Text>.
            <Text fontSize="sm">{gas1dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Swap ETH to STANDARD</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas2}</Text>.
            <Text fontSize="sm">{gas2dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Allow Deposit STANDARD in Governance</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas3}</Text>.
            <Text fontSize="sm">{gas3dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Deposit STANDARD in Governance</StatHelpText>

          <Divider />
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas4}</Text>.
            <Text fontSize="sm">{gas4dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatLabel>Total</StatLabel>
        </Stat>
      </Box>
    </Box>
  );
}
