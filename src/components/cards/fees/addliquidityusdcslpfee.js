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
import { useState, useEffect } from "react";

export default function AddLiquidityUSDCSLPFee(props) {
  const [gas1, setGas1] = useState(0);
  const [gas2, setGas2] = useState(0);
  const [gas3, setGas3] = useState(0);
  const [gas4, setGas4] = useState(0);
  const [gas5, setGas5] = useState(0);
  const [gas6, setGas6] = useState(0);
  const [gas7, setGas7] = useState(0);
  const [gas8, setGas8] = useState(0);
  const [gas1dec, setGas1dec] = useState("");
  const [gas2dec, setGas2dec] = useState("");
  const [gas3dec, setGas3dec] = useState("");
  const [gas4dec, setGas4dec] = useState("");
  const [gas5dec, setGas5dec] = useState("");
  const [gas6dec, setGas6dec] = useState("");
  const [gas7dec, setGas7dec] = useState("");
  const [gas8dec, setGas8dec] = useState("");

  useEffect(() => {
    if (!props.gasPrice || !props.ethPrice) return;

    let gas1 = (191461 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas1(Math.floor(gas1));
    setGas1dec(gas1.toString().split(".")[1].slice(0, 2));

    let gas2 = (226052 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas2(Math.floor(gas2));
    setGas2dec(gas2.toString().split(".")[1].slice(0, 2));

    let gas3 = (46506 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas3(Math.floor(gas3));
    setGas3dec(gas3.toString().split(".")[1].slice(0, 2));

    let gas4 = (60311 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas4(Math.floor(gas4));
    setGas4dec(gas4.toString().split(".")[1].slice(0, 2));

    let gas5 = (181572 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas5(Math.floor(gas5));
    setGas5dec(gas5.toString().split(".")[1].slice(0, 2));

    let gas6 = (46454 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas6(Math.floor(gas6));
    setGas6dec(gas6.toString().split(".")[1].slice(0, 2));

    let gas7 = (204227 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas7(Math.floor(gas7));
    setGas7dec(gas7.toString().split(".")[1].slice(0, 2));

    let gas8 =
      ((191461 + 226052 + 46506 + 60311 + 181572 + 46454 + 204227) *
        props.gasPrice *
        props.ethPrice) /
      1000000000;
    setGas8(Math.floor(gas8));
    setGas8dec(gas8.toString().split(".")[1].slice(0, 2));
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
          <StatLabel fontSize="m">
            Add Liquidity in USDC LP process fee
          </StatLabel>
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
          <StatHelpText>Swap ETH to USDC</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas3}</Text>.
            <Text fontSize="sm">{gas3dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Allow STANDARD in LP</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas4}</Text>.
            <Text fontSize="sm">{gas4dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Allow USDC in LP</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas5}</Text>.
            <Text fontSize="sm">{gas5dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Add Liquidity</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas6}</Text>.
            <Text fontSize="sm">{gas6dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Allow SLP in yield farm</StatHelpText>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas7}</Text>.
            <Text fontSize="sm">{gas7dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatHelpText>Add SLP in yield farm</StatHelpText>
          <Divider />
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas8}</Text>.
            <Text fontSize="sm">{gas8dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>
          <StatLabel>Total</StatLabel>
        </Stat>
      </Box>
    </Box>
  );
}
