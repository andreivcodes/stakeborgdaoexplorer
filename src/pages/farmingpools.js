import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import { ChakraProvider, Container } from "@chakra-ui/react";

function Farmingpools() {
  return (
    <div className="App">
      <Header />
      <Container className="pageContainer">Farming pools</Container>
      <Footer />
    </div>
  );
}

export default Farmingpools;
