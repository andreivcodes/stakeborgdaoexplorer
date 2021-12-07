import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

export default function FarmingClaimFee(props) {
  return (
    <Box
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel fontSize="m">Farming claim fee</StatLabel>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (191461 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
