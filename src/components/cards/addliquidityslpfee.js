import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";

export default function AddLiquiditySLPFee(props) {
  return (
    <Box
      boxShadow="base"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel fontSize="m">Add Liquidity in SLP process fee</StatLabel>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (191461 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Swap ETH to STANDARD</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (226052 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Swap ETH to USDC</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (46506 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow STANDARD in LP</StatHelpText>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (60311 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow USDC in LP</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (181572 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Add Liquidity</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (46454 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow SLP in yield farm</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (204227 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Add SLP in yield farm</StatHelpText>
          <Divider />
          <StatNumber>
            {new Intl.NumberFormat().format(
              ((191461 + 226052 + 46506 + 60311 + 181572 + 46454 + 204227) *
                props.gasPrice *
                props.ethPrice) /
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
