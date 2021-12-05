import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import {
  Container,
  Box,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function Address() {
  const { addr } = useParams();

  return (
    <div className="App">
      <Header />
      <Container className="pageContainer" maxW="70vw">
        <Box
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Box m="3">
            <Stat>
              <StatHelpText>Holdings of </StatHelpText>
              <StatNumber>{addr}</StatNumber>
              <StatLabel mt="2rem">Wallet</StatLabel>
              <StatNumber>123</StatNumber>
              <StatLabel>Governance staking</StatLabel>
              <StatNumber>123</StatNumber>
              <StatLabel>Governance unclaimed rewards</StatLabel>
              <StatNumber>123</StatNumber>
              <StatLabel>Farming unclaimed rewards</StatLabel>
              <StatNumber>123</StatNumber>
              <StatLabel>Airdrop unclaimed rewards</StatLabel>
              <StatNumber>123</StatNumber>
              <StatLabel mt="2rem">Total</StatLabel>
              <StatNumber>123</StatNumber>
            </Stat>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Address;
