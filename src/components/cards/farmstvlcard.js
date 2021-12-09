import {
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import farms_contract_abi from "./../../abi/farms.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_CHAINSTACK)
);

const farms_contract_address = "0x7F4FE6776a9617847485d43db0d3A9b734e459C5";

const BOND_contract_address = "0x0391D2021f89DC339F60Fff84546EA23E337750f";
const SWINGBY_contract_address = "0x8287c7b963b405b7b8d467db9d79eec40625b13a";
const XYZ_contract_address = "0x618679df9efcd19694bb1daa8d00718eacfa2883";

const farmsContract = new web3.eth.Contract(
  farms_contract_abi,
  farms_contract_address
);

export default function FarmsTVLCard() {
  const [bondTokens, setBondTokens] = useState(0);
  const [swingbyTokens, setSwingbyToken] = useState(0);
  const [xyzTokens, setXyzTokens] = useState(0);
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const currentEpoch = await farmsContract.methods.getCurrentEpoch().call();

      setEpoch(currentEpoch);

      const batch = new web3.BatchRequest();

      let promise1 = new Promise((resolve, rej) => {
        batch.add(
          farmsContract.methods
            .getEpochPoolSize(BOND_contract_address, currentEpoch)
            .call.request(null, (err, res) => {
              resolve(res);
            })
        );
      });

      let promise2 = new Promise((resolve, rej) => {
        batch.add(
          farmsContract.methods
            .getEpochPoolSize(SWINGBY_contract_address, currentEpoch)
            .call.request(null, (err, res) => {
              resolve(res);
            })
        );
      });

      let promise3 = new Promise((resolve, rej) => {
        batch.add(
          farmsContract.methods
            .getEpochPoolSize(XYZ_contract_address, currentEpoch)
            .call.request(null, (err, res) => {
              resolve(res);
            })
        );
      });

      batch.execute();

      return Promise.all([promise1, promise2, promise3]).then((res) => {
        const [bondAmount, swingbyAmount, xyzAmount] = res;

        setBondTokens(bondAmount / 1000000000000000000);
        setSwingbyToken(swingbyAmount / 1000000000000000000);
        setXyzTokens(xyzAmount / 1000000000000000000);
      });
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
            <StatLabel>BOND</StatLabel>
            <StatHelpText>epoch {epoch}</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(bondTokens)}
            </StatNumber>
            tokens
          </Stat>
          <Stat p={4}>
            <StatLabel>SWINGBY</StatLabel>
            <StatHelpText>epoch {epoch}</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(swingbyTokens)}
            </StatNumber>
            tokens
          </Stat>
          <Stat p={4}>
            <StatLabel>XYZ </StatLabel>
            <StatHelpText>epoch {epoch}</StatHelpText>
            <StatNumber>{new Intl.NumberFormat().format(xyzTokens)}</StatNumber>
            tokens
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
}
