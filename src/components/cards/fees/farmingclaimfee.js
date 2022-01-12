import {
  Stat,
  StatLabel,
  Collapse,
  Button,
  StatHelpText,
  Box,
  useColorModeValue,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import yieldfarmtoken_bond_abi from "../../../abi/yieldfarmtoken_bond.json";
import yieldfarmtoken_swingby_abi from "../../../abi/yieldfarmtoken_swingby.json";
import yieldfarmtoken_xyz_abi from "../../../abi/yieldfarmtoken_xyz.json";
import yieldfarmtoken_usdc_lp_abi from "../../../abi/yieldfarmtoken_usdc_lp.json";
import yieldfarmtoken_ilsi_lp_abi from "../../../abi/yieldfarmtoken_ilsi_lp.json";
import { useEffect, useState } from "react";
import Web3 from "web3";

const yield_farm_bond_contract_address =
  "0x2b31D07A2625a2fBAe68feed5a818ffc00dFB21b";

const yield_farm_swingby_contract_address =
  "0xab0a722e5e8e6ea4299fe0cbed7f62c2a904267a";

const yield_farm_xyz_contract_address =
  "0x2b89b42a95676dc74013ece6c07a760df5709c5c";

const yield_farm_usdc_lp_contract_address =
  "0x41099b337F8435579dea46C7840b730ca87Fd35A";

const yield_farm_ilsi_lp_contract_address =
  "0xc898c3c30a4f610ab7a524b61620b58168d0e0d1";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

let yield_unclaimed_bond_contract = new web3.eth.Contract(
  yieldfarmtoken_bond_abi,
  yield_farm_bond_contract_address
);
let yield_unclaimed_swingby_contract = new web3.eth.Contract(
  yieldfarmtoken_swingby_abi,
  yield_farm_swingby_contract_address
);
let yield_unclaimed_xyz_contract = new web3.eth.Contract(
  yieldfarmtoken_xyz_abi,
  yield_farm_xyz_contract_address
);
let yield_unclaimed_usdc_lp_contract = new web3.eth.Contract(
  yieldfarmtoken_usdc_lp_abi,
  yield_farm_usdc_lp_contract_address
);

let yield_unclaimed_ilsi_lp_contract = new web3.eth.Contract(
  yieldfarmtoken_ilsi_lp_abi,
  yield_farm_ilsi_lp_contract_address
);

export default function FarmingClaimFee(props) {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const [gas1, setGas1] = useState(0);
  const [gas2, setGas2] = useState(0);
  const [gas3, setGas3] = useState(0);
  const [gas4, setGas4] = useState(0);
  const [gas5, setGas5] = useState(0);
  const [gas1dec, setGas1dec] = useState("");
  const [gas2dec, setGas2dec] = useState("");
  const [gas3dec, setGas3dec] = useState("");
  const [gas4dec, setGas4dec] = useState("");
  const [gas5dec, setGas5dec] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!props.gasPrice || !props.ethPrice) return;

      let address = props.address;
      if (!props.address)
        address = "0x000000000000000000000000000000000000dEaD";

      yield_unclaimed_bond_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas1 = (160000 * props.gasPrice * props.ethPrice) / 1000000000;
            setGas1(Math.floor(gas1));
            setGas1dec(gas1.toString().split(".")[1].slice(0, 2));
          } else {
            let gas1 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            setGas1(Math.floor(gas1));
            setGas1dec(gas1.toString().split(".")[1].slice(0, 2));
          }
        });

      yield_unclaimed_swingby_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas2 = (160000 * props.gasPrice * props.ethPrice) / 1000000000;
            setGas2(Math.floor(gas2));
            setGas2dec(gas2.toString().split(".")[1].slice(0, 2));
          } else {
            let gas2 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            setGas2(Math.floor(gas2));
            setGas2dec(gas2.toString().split(".")[1].slice(0, 2));
          }
        });

      yield_unclaimed_xyz_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas3 = (160000 * props.gasPrice * props.ethPrice) / 1000000000;
            setGas3(Math.floor(gas3));
            setGas3dec(gas3.toString().split(".")[1].slice(0, 2));
          } else {
            let gas3 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            setGas3(Math.floor(gas3));
            setGas3dec(gas3.toString().split(".")[1].slice(0, 2));
          }
        });

      yield_unclaimed_usdc_lp_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas4 = (160000 * props.gasPrice * props.ethPrice) / 1000000000;
            setGas4(Math.floor(gas4));
            setGas4dec(gas4.toString().split(".")[1].slice(0, 2));
          } else {
            let gas4 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            setGas4(Math.floor(gas4));
            setGas4dec(gas4.toString().split(".")[1].slice(0, 2));
          }
        });

      yield_unclaimed_ilsi_lp_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            let gas5 = (160000 * props.gasPrice * props.ethPrice) / 1000000000;
            setGas5(Math.floor(gas5));
            setGas5dec(gas5.toString().split(".")[1].slice(0, 2));
          } else {
            let gas5 = (gas * props.gasPrice * props.ethPrice) / 1000000000;
            setGas5(Math.floor(gas5));
            setGas5dec(gas5.toString().split(".")[1].slice(0, 2));
          }
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
          <StatLabel fontSize="m">Farming claim fee</StatLabel>

          <Divider mt="1rem" />
          <Button size="sm" onClick={handleToggle} mt="1rem">
            Show {show ? "Less" : "More"}
          </Button>

          <Collapse startingHeight={5} in={show}>
            <Box>
              <Divider mt="1rem" />
              <Box px="2">
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize="2xl">{gas1}</Text>.
                  <Text fontSize="sm">{gas1dec}</Text>
                  <Text fontSize="2xl">&nbsp;$</Text>
                </Flex>
                <StatHelpText>BOND farm</StatHelpText>
              </Box>
              <Divider mt="1rem" />
              <Box px="2">
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize="2xl">{gas2}</Text>.
                  <Text fontSize="sm">{gas2dec}</Text>
                  <Text fontSize="2xl">&nbsp;$</Text>
                </Flex>
                <StatHelpText>SWINGBY farm</StatHelpText>
              </Box>
              <Divider mt="1rem" />
              <Box px="2">
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize="2xl">{gas3}</Text>.
                  <Text fontSize="sm">{gas3dec}</Text>
                  <Text fontSize="2xl">&nbsp;$</Text>
                </Flex>
                <StatHelpText>XYZ farm</StatHelpText>
              </Box>
              <Divider mt="1rem" />
              <Box px="2">
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize="2xl">{gas4}</Text>.
                  <Text fontSize="sm">{gas4dec}</Text>
                  <Text fontSize="2xl">&nbsp;$</Text>
                </Flex>
                <StatHelpText>USDC LP farm</StatHelpText>
              </Box>
              <Divider mt="1rem" />
              <Box px="2">
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize="2xl">{gas5}</Text>.
                  <Text fontSize="sm">{gas5dec}</Text>
                  <Text fontSize="2xl">&nbsp;$</Text>
                </Flex>
                <StatHelpText>ILSI LP farm</StatHelpText>
              </Box>
            </Box>
          </Collapse>
        </Stat>
      </Box>
    </Box>
  );
}
