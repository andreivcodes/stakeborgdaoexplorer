import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ilsi_contract_abi from "../../../abi/ilsi.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const ilsi_contract_address = "0x0acC0FEE1D86D2cD5AF372615bf59b298D50cd69";

const ilsiContract = new web3.eth.Contract(
  ilsi_contract_abi,
  ilsi_contract_address
);
export default function ILSITotalSupply() {
  const [ilsiTotalSupply, setIlsiTotalSupply] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const ilsiSupply = await ilsiContract.methods.totalSupply().call();
      setIlsiTotalSupply(ilsiSupply / 1000000000000000000);
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
          <StatLabel>ILSI</StatLabel>
          <StatHelpText>total supply</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(ilsiTotalSupply)} ILSI
          </StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
