import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

import FarmingClaimFee from "./../components/cards/fees/farmingclaimfee";
import AddLiquidityUSDCSLPFee from "./../components/cards/fees/addliquidityusdcslpfee";
import AddLiquidityILSISLPFee from "./../components/cards/fees/addliquidityilsislpfee";
import StakingFee from "./../components/cards/fees/stakingfee";

import { useEffect, useState } from "react";

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
        <Text mt="1rem">
          These estimates can simulate real transactions. Simulated results are
          more precise than estimated results!
        </Text>
        <Text fontWeight={600}>
          For a better simulation please enter your address in the field above.
        </Text>
        <Text fontWeight={600}>
          You can also set the gas price manually using the slider below
        </Text>
        {gasPrice ? (
          <Slider
            aria-label="slider-ex-1"
            min={10}
            max={150}
            defaultValue={gasPrice}
            onChangeEnd={(val) => setGasPrice(val)}
            mt="1rem"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        ) : null}
        {gasPrice} gwei
        <Grid alignItems="stretch" mt="2rem">
          <GridItem m="1" gridColumn={1}>
            <FarmingClaimFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1" gridColumn={2}>
            <StakingFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1" gridColumn={3}>
            <AddLiquidityUSDCSLPFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
          <GridItem m="1" gridColumn={4}>
            <AddLiquidityILSISLPFee
              ethPrice={ethPrice}
              gasPrice={gasPrice}
              address={address}
            />
          </GridItem>
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
