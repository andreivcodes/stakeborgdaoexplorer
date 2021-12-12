import "./../App.css";
import Header from "../components/header";
import Footer from "../components/footer";
import PriceCard from "../components/cards/pricecard";
import VolumeCard from "../components/cards/volumecard";
import MarketcapCard from "../components/cards/mkcapcard";
import CirculatingCard from "../components/cards/circulatingcard";
import FarmsTVLCard from "../components/cards/farmstvlcard";
import LPTVLCard from "../components/cards/lptvlcard";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import governance_staking_abi from "./../abi/governance_staking.json";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.REACT_APP_AWS_NODE)
);

const governance_staking_dao_contract_adress =
  "0xbA319F6F6AC8F45E556918A0C9ECDDE64335265C";

let governance_staking_contract = new web3.eth.Contract(
  governance_staking_abi,
  governance_staking_dao_contract_adress
);

function Governance() {
  const [calcualatedWAY, setCalculatedWAY] = useState(0);
  const [input, setInput] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let govTotalStaked =
        await governance_staking_contract.methods.stakeborgTokenStaked
          .call()
          .call();
      setCalculatedWAY(
        Number((input / govTotalStaked) * 1000000000000000000 * 22400)
      );
    }
    fetchData();
  }, [input]);

  return (
    <Box className="App">
      <Header />
      <Container className="pageContainer" maxW="50rem">
        <Box
          boxShadow="base"
          h="full"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Box m="3">
            <Stat>
              <StatLabel>Governance WAY</StatLabel>
              <Input
                mt="1rem"
                placeholder="How much standard are you staking?"
                onChange={(evt) => {
                  setInput(evt.target.value);
                }}
              />

              <StatNumber mt="1rem">
                Your weekly reward is{" "}
                {new Intl.NumberFormat().format(calcualatedWAY)} $STANDARD
              </StatNumber>
            </Stat>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default Governance;
