import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LPTVLCard() {
  return (
    <Box
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel>USDC LP</StatLabel>
          <StatHelpText>total locked value</StatHelpText>
          <StatNumber>444</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
