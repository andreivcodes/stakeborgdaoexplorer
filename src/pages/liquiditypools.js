import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import { Container } from "@chakra-ui/react";
function Liquiditypools() {
  return (
    <div className="App">
      <Header />
      <Container className="pageContainer">Liquidity pools</Container>{" "}
      <Footer />
    </div>
  );
}

export default Liquiditypools;
