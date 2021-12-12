import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import sushiswap_abi from "./../../abi/sushiswap.json";
import standard_abi from "./../../abi/standard_token.json";
import governance_staking_abi from "./../../abi/governance_staking.json";

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
  const [swapFee, setSwapFee] = useState(0);
  const [allowDepositFee, setAllowDepositFee] = useState(0);
  const [depositFee, setDepositFee] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (props.address) {
        var now = Math.round(new Date().getTime() / 1000) + 1000;
        setSwapFee(0);
        setAllowDepositFee(0);
        setDepositFee(0);
        setSwapFee(
          await sushiswap_contract.methods
            .swapExactETHForTokens(
              "1",
              [
                "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
                "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                "0xDA0c94c73D127eE191955FB46bACd7FF999b2bcd",
              ],
              props.address,
              now
            )
            .estimateGas({ from: props.address, value: "1000000000" })
        );

        setAllowDepositFee(
          await standard_contract.methods
            .approve("0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C", 100)
            .estimateGas({ from: props.address })
        );

        setDepositFee(
          await governance_staking_contract.methods
            .deposit(1)
            .estimateGas({ from: "0x3854af70a674187d46463a9d0927478b4a1ada8a" })
        );
      } else {
        setSwapFee(0);
        setAllowDepositFee(0);
        setDepositFee(0);
      }
    }
    fetchData();
  }, [props.address]);

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
          <StatNumber>
            {new Intl.NumberFormat().format(
              (swapFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Swap ETH to STANDARD</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (allowDepositFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow Deposit STANDARD in Governance</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (depositFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Deposit STANDARD in Governance</StatHelpText>

          <Divider />
          <StatNumber>
            {new Intl.NumberFormat().format(
              ((swapFee + allowDepositFee + depositFee) *
                props.gasPrice *
                props.ethPrice) /
                1000000000
            )}{" "}
            $
          </StatNumber>
          <StatLabel>Total</StatLabel>
        </Stat>
      </Box>
    </Box>
  );
}
