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
      <Container className="pageContainer" maxW="65vw">
        <Text fontSize="3xl" mt="5rem">
          Statistics for $STANDARD token
        </Text>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(3, 1fr)"
          mt="2rem"
        >
          <GridItem row={1} col={1}>
            <PriceCard />
          </GridItem>
          <GridItem row={1} col={2}>
            <MarketcapCard />
          </GridItem>
          <GridItem row={1} col={3}>
            <CirculatingCard />
          </GridItem>
          <GridItem row={2} colSpan={3}>
            <FarmsTVLCard />
          </GridItem>
          <GridItem row={3} colSpan={3}>
            <LPTVLCard />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
