import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";

export default function StakingFee(props) {
  return (
    <Box
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel fontSize="m">Staking process fee</StatLabel>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (191461 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Swap ETH to STANDARD</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (46506 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow Deposit STANDARD in Governance</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (294639 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Deposit STANDARD in Governance</StatHelpText>

          <Divider />
          <StatNumber>
            {new Intl.NumberFormat().format(
              ((294639 + 46506 + 191461) * props.gasPrice * props.ethPrice) /
                1000000000
            )}{" "}
            $
          </StatNumber>
          <StatLabel>Total</StatLabel>
        </Stat>
      </Box>
    </Box>
  );
}
