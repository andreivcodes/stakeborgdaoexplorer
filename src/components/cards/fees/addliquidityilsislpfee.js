import {
  Stat,
  StatLabel,
  Box,
  Collapse,
  Button,
  useColorModeValue,
  StatHelpText,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AddLiquiditySLPFee(props) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const [gas1, setGas1] = useState(0);
  const [gas2, setGas2] = useState(0);
  const [gas3, setGas3] = useState(0);
  const [gas4, setGas4] = useState(0);
  const [gas5, setGas5] = useState(0);
  const [gas6, setGas6] = useState(0);
  const [gas1dec, setGas1dec] = useState("");
  const [gas2dec, setGas2dec] = useState("");
  const [gas3dec, setGas3dec] = useState("");
  const [gas4dec, setGas4dec] = useState("");
  const [gas5dec, setGas5dec] = useState("");
  const [gas6dec, setGas6dec] = useState("");

  useEffect(() => {
    if (!props.gasPrice || !props.ethPrice) return;

    let gas1 = (120200 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas1(Math.floor(gas1));
    setGas1dec(gas1.toString().split(".")[1].slice(0, 2));

    let gas2 = (46700 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas2(Math.floor(gas2));
    setGas2dec(gas2.toString().split(".")[1].slice(0, 2));

    let gas3 = (170400 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas3(Math.floor(gas3));
    setGas3dec(gas3.toString().split(".")[1].slice(0, 2));

    let gas4 = (46454 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas4(Math.floor(gas4));
    setGas4dec(gas4.toString().split(".")[1].slice(0, 2));

    let gas5 = (204227 * props.gasPrice * props.ethPrice) / 1000000000;
    setGas5(Math.floor(gas5));
    setGas5dec(gas5.toString().split(".")[1].slice(0, 2));

    let gas6 =
      ((120200 + 46700 + 170400 + 46454 + 204227) *
        props.gasPrice *
        props.ethPrice) /
      1000000000;
    setGas6(Math.floor(gas6));
    setGas6dec(gas6.toString().split(".")[1].slice(0, 2));
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
            Add Liquidity in ILSI LP process fee
          </StatLabel>

          <Flex alignItems={"center"} justifyContent={"center"}>
            <Text fontSize="2xl">{gas6}</Text>.
            <Text fontSize="sm">{gas6dec}</Text>
            <Text fontSize="2xl">&nbsp;$</Text>
          </Flex>

          <StatLabel>Total</StatLabel>

          <Divider mt="1rem" />
          <Button size="sm" onClick={handleToggle} mt="1rem">
            Show {show ? "Less" : "More"}
          </Button>

          <Collapse startingHeight={5} in={show}>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontSize="xl">{gas1}</Text>.
              <Text fontSize="sm">{gas1dec}</Text>
              <Text fontSize="xl">&nbsp;$</Text>
            </Flex>
            <StatHelpText fontSize="sm">Swap ETH to ILSI</StatHelpText>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontSize="xl">{gas2}</Text>.
              <Text fontSize="sm">{gas2dec}</Text>
              <Text fontSize="xl">&nbsp;$</Text>
            </Flex>
            <StatHelpText fontSize="sm">Allow ILSI in LP</StatHelpText>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontSize="xl">{gas3}</Text>.
              <Text fontSize="sm">{gas3dec}</Text>
              <Text fontSize="xl">&nbsp;$</Text>
            </Flex>
            <StatHelpText fontSize="sm"> Add Liquidity</StatHelpText>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontSize="xl">{gas4}</Text>.
              <Text fontSize="sm">{gas4dec}</Text>
              <Text fontSize="xl">&nbsp;$</Text>
            </Flex>
            <StatHelpText fontSize="sm">Allow SLP in yield farm</StatHelpText>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text fontSize="xl">{gas5}</Text>.
              <Text fontSize="sm">{gas5dec}</Text>
              <Text fontSize="xl">&nbsp;$</Text>
            </Flex>
            <StatHelpText fontSize="sm">Add SLP in yield farm</StatHelpText>
          </Collapse>
        </Stat>
      </Box>
    </Box>
  );
}
