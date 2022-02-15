import "./../App.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { Box, Container, Text, Center } from "@chakra-ui/react";

export default function ILSIStats() {
  return (
    <Box className="App">
      <Header />
      <Container className="pageContainer" maxW="95vw">
        <Box boxShadow="base" h="full" borderWidth="1px" borderRadius="lg">
          <Box m="3">
            <Text>ILSI performance</Text>
            <Center>
              <Box
                mt="3"
                background="#dee"
                borderRadius="5"
                h="50vh"
                w="90vw"
                as="iframe"
                src="https://dune.xyz/embeds/407973/779037/4a4f7619-e542-4684-babe-4d746561d605"
              />
            </Center>
          </Box>
        </Box>

        <Box
          boxShadow="base"
          h="full"
          borderWidth="1px"
          borderRadius="lg"
          mt="3"
        >
          <Box m="3">
            <Text>ILSI breakdown</Text>
            <Center>
              <Box
                mt="3"
                background="#dee"
                borderRadius="5"
                h="50vh"
                w="90vw"
                as="iframe"
                src="https://dune.xyz/embeds/412293/786878/3302058b-fcfb-4b43-b882-fcc8b2d03002"
              />
            </Center>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
