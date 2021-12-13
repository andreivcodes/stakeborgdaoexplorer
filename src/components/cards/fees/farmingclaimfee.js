import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import yieldfarmtoken_bond_abi from "../../../abi/yieldfarmtoken_bond.json";
import yieldfarmtoken_swingby_abi from "../../../abi/yieldfarmtoken_swingby.json";
import yieldfarmtoken_xyz_abi from "../../../abi/yieldfarmtoken_xyz.json";
import yieldfarmtoken_usdc_lp_abi from "../../../abi/yieldfarmtoken_usdc_lp.json";
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

export default function FarmingClaimFee(props) {
  const [usdcLPfee, setUSDCLPFee] = useState(0);
  const [bondFee, setBondFee] = useState(0);
  const [xyzFee, setXyzFee] = useState(0);
  const [swingbyFee, setSwingbyFee] = useState(0);

  const [usdcLPfeeSim, setUSDCLPFeeSim] = useState(false);
  const [bondFeeSim, setBondFeeSim] = useState(false);
  const [xyzFeeSim, setXyzFeeSim] = useState(false);
  const [swingbyFeeSim, setSwingbyFeeSim] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let address = props.address;
      if (!props.address)
        address = "0x000000000000000000000000000000000000dEaD";

      yield_unclaimed_bond_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            setBondFee(160000);
            setBondFeeSim(false);
          } else {
            setBondFee(gas);
            setBondFeeSim(true);
          }
        });

      yield_unclaimed_swingby_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            setSwingbyFee(160000);
            setSwingbyFeeSim(false);
          } else {
            setSwingbyFee(gas);
            setSwingbyFeeSim(true);
          }
        });

      yield_unclaimed_xyz_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            setXyzFee(160000);
            setXyzFeeSim(false);
          } else {
            setXyzFee(gas);
            setXyzFeeSim(true);
          }
        });

      yield_unclaimed_usdc_lp_contract.methods
        .massHarvest()
        .estimateGas({ from: address }, function (err, gas) {
          if (err) {
            setUSDCLPFee(160000);
            setUSDCLPFeeSim(false);
          } else {
            setUSDCLPFee(gas);
            setUSDCLPFeeSim(true);
          }
        });
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
          <StatLabel fontSize="m">Farming claim fee</StatLabel>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (usdcLPfee * props.gasPrice * props.ethPrice) / 1000000000
            )}
            {" $"}
            {usdcLPfeeSim ? " simulated" : " estimated"}
          </StatNumber>
          <StatHelpText>USDC farm</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (bondFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            {" $"}
            {bondFeeSim ? " simulated" : " estimated"}
          </StatNumber>
          <StatHelpText>BOND farm</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (xyzFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            {" $"}
            {xyzFeeSim ? " simulated" : " estimated"}
          </StatNumber>
          <StatHelpText>XYZ farm</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (swingbyFee * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            {" $"}
            {swingbyFeeSim ? " simulated" : " estimated"}
          </StatNumber>
          <StatHelpText>SWINGBY farm</StatHelpText>
        </Stat>
      </Box>
    </Box>
  );
}
