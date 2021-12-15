import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import PriceCard from "../components/cards/home/pricecard";
import VolumeCard from "../components/cards/home/volumecard";
import MarketcapCard from "../components/cards/home/mkcapcard";
import CirculatingCard from "../components/cards/home/circulatingcard";
import FarmsTVLCard from "../components/cards/home/farmstvlcard";
import LPTVLCard from "../components/cards/home/lptvlcard";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import ILSI from "../components/cards/home/ilsi";

function Home() {
  return (
    <Box className="App">
      <Header />
      <Container className="pageContainer" maxW="50rem">
        <Text fontSize="3xl">Statistics for the $STANDARD token</Text>
        <Grid
          templateRows="repeat(5, auto)"
          templateColumns="repeat(2, 1fr)"
          alignItems="stretch"
          mt="2rem"
        >
          <GridItem row={1} col={1} m="1">
            <PriceCard />
          </GridItem>
          <GridItem row={1} col={2} m="1">
            <VolumeCard />
          </GridItem>
          <GridItem row={2} col={1} m="1">
            <MarketcapCard />
          </GridItem>
          <GridItem row={2} col={2} m="1">
            <CirculatingCard />
          </GridItem>
          <GridItem row={3} colSpan={2} m="1">
            <FarmsTVLCard />
          </GridItem>
          <GridItem row={4} colSpan={2} m="1">
            <LPTVLCard />
          </GridItem>
          <GridItem row={5} colSpan={2} m="1">
            <ILSI />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
