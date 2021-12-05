import {
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function FarmsTVLCard() {
  return (
    <Box
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <StatGroup>
          <Stat>
            <StatLabel>BOND</StatLabel>
            <StatHelpText>tokens in farm</StatHelpText>
            <StatNumber>111</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>SWINGBY</StatLabel>
            <StatHelpText>tokens in farm</StatHelpText>
            <StatNumber>222</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>XYZ </StatLabel>
            <StatHelpText>tokens in farm</StatHelpText>
            <StatNumber>333</StatNumber>
          </Stat>
        </StatGroup>
      </Box>
    </Box>
  );
}
