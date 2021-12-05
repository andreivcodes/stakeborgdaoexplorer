import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function MarketcapCard() {
  return (
    <Box
      m="3"
      // maxW="20rem"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel>Market Cap</StatLabel>
          <StatNumber>555555</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
