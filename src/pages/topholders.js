import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import {
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Container,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

function entry(
  _address,
  _wallet,
  _govstaking,
  _govunclaimed,
  _farmunclaimed,
  _airdropunclaimed,
  _total
) {
  return (
    <Tr>
      <Td>{_address}</Td>
      <Td isNumeric>{_wallet}</Td>
      <Td isNumeric>{_govstaking}</Td>
      <Td isNumeric>{_govunclaimed}</Td>
      <Td isNumeric>{_farmunclaimed}</Td>
      <Td isNumeric>{_airdropunclaimed}</Td>
      <Td isNumeric>{_total}</Td>
    </Tr>
  );
}

function Topholders() {
  return (
    <div className="App">
      <Header />
      <Container className="pageContainer" maxW="80rem">
        <Box
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Box m="3">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Address</Th>
                  <Th isNumeric>Wallet</Th>
                  <Th isNumeric>Governance staking</Th>
                  <Th isNumeric>Governance unclaimed</Th>
                  <Th isNumeric>Farming unclaimed</Th>
                  <Th isNumeric>Airdrop unclaimed</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {entry("0xdead", 123, 123, 123, 123, 123, 123, 999)}
                {entry("0xbeef", 321, 321, 321, 321, 321, 321, 888)}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Topholders;
