import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import PriceCard from "../components/cards/pricecard";
import MarketcapCard from "../components/cards/mkcapcard";
import CirculatingCard from "../components/cards/circulatingcard";
import FarmsTVLCard from "../components/cards/farmstvlcard";
import LPTVLCard from "../components/cards/lptvlcard";
import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
function Home() {
  return (
    <Box className="App">
      <Header />
      <Container className="pageContainer" maxW="50rem">
        <Text fontSize="3xl">Statistics for the $STANDARD token</Text>
        <Grid
          templateRows="repeat(3, auto)"
          templateColumns="repeat(3, auto)"
          alignItems="stretch"
          mt="2rem"
        >
          <GridItem row={1} col={1} m="1">
            <PriceCard />
          </GridItem>
          <GridItem row={1} col={2} m="1">
            <MarketcapCard />
          </GridItem>
          <GridItem row={1} col={3} m="1">
            <CirculatingCard />
          </GridItem>
          <GridItem row={2} colSpan={3} m="1">
            <FarmsTVLCard />
          </GridItem>
          <GridItem row={3} colSpan={3} m="1">
            <LPTVLCard />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
