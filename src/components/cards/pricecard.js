import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PriceCard() {
  return (
    <Box
      m="1"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel>Current Price</StatLabel>
          <StatNumber>666666</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
