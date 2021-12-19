import {
  Stat,
  StatGroup,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ilsi_contract_abi from "../../../abi/ilsi.json";
import general_erc20_abi from "../../../abi/generalerc20.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const ilsi_contract_address = "0x0acC0FEE1D86D2cD5AF372615bf59b298D50cd69";

const ilsiContract = new web3.eth.Contract(
  ilsi_contract_abi,
  ilsi_contract_address
);
export default function ILSI() {
  const [ilsiTotalSupply, setIlsiTotalSupply] = useState(0);
  const [ilsiPrice, setIlsiPrice] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const ilsiSupply = await ilsiContract.methods.totalSupply().call();

      setIlsiTotalSupply(ilsiSupply / 1000000000000000000);

      let ilsiComponents = await ilsiContract.methods.getComponents().call();

      let componentsList = [];

      let ilsiPrice = 0;

      ilsiComponents.forEach(async (componentAddress) => {
        let amount = await ilsiContract.methods
          .getTotalComponentRealUnits(componentAddress)
          .call();

        let decimals = await new web3.eth.Contract(
          general_erc20_abi,
          componentAddress
        ).methods.decimals
          .call()
          .call();

        let price = await (
          await fetch(
            "https://api.coingecko.com/api/v3/coins/ethereum/contract/" +
              componentAddress
          )
        ).json();

        price = price.market_data.current_price.usd;

        componentsList.push({
          address: componentAddress,
          amount: Number(amount),
          price: Number(price),
          decimals: Number(decimals),
        });

        ilsiPrice += (Number(amount) * Number(price)) / Math.pow(10, decimals);
        setIlsiPrice(ilsiPrice);
      });
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
        <StatGroup>
          <Stat>
            <StatHelpText>ILSI Price</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(ilsiPrice)} $
            </StatNumber>
          </Stat>
          <Stat>
            <StatHelpText>ILSI Total supply</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(ilsiTotalSupply)} ILSI
            </StatNumber>
          </Stat>
          <Stat>
            <StatHelpText>ILSI Market Cap</StatHelpText>
            <StatNumber>
              {new Intl.NumberFormat().format(ilsiTotalSupply * ilsiPrice)} $
            </StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
}
