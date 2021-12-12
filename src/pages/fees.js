import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import { Box, Container, Grid, GridItem, Text, Input } from "@chakra-ui/react";
import StakingFee from "../components/cards/stakingfee";
import { useEffect, useState } from "react";
import FarmingClaimFee from "../components/cards/farmingclaimfee";
import AddLiquiditySLPFee from "../components/cards/addliquidityslpfee";
export default function Fees() {
  const [ethPrice, setEthPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum?market_data=true"
        )
      ).json();
      setEthPrice(response["market_data"]["current_price"]["usd"]);

      response = await (
        await fetch(
          " https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=N2WT6YVFHPPQCVWY74K6BPRA6Y3CCZ9NNT"
        )
      ).json();

      setGasPrice(response.result.SafeGasPrice);
    }
    fetchData();
  }, []);
  return (
    <Box className="App">
      <Header />
      <Container className="pageContainer" maxW="50rem">
        <Text fontSize="xl">These are estimates! Treat them accordingly!</Text>
        <br />
        <Text fontSize="md">
          These estimates are based on the current price of ETH - {ethPrice} $
        </Text>
        <Text fontSize="md">and current price of gas - {gasPrice} Gwei</Text>
        <Input
          mt="1rem"
          placeholder="Enter your address"
          onChange={(evt) => {
            setAddress(evt.target.value);
          }}
        />

        <Text m="1rem">
          These estimates simulate real transactions. This means that some of
          the results might be 0 in case proper conditions are not met (for
          example you have a 0 balance but want to simulate staking deposit).
        </Text>

        <Grid alignItems="stretch" mt="2rem">
          <GridItem m="1">
            <FarmingClaimFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1">
            <StakingFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1">
            <AddLiquiditySLPFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1"></GridItem>
          <GridItem m="1"></GridItem>
          <GridItem m="1"></GridItem>
        </Grid>
        <Text fontSize="md">
          These estimates assume you only hold Ethereum and have no allowed
          smart contracts.
        </Text>
      </Container>
      <Footer />
    </Box>
  );
}
