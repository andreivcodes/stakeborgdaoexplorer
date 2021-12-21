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
          <StatLabel fontSize="m">
            Add Liquidity in ILSI LP process fee
          </StatLabel>
          <StatNumber>
            {new Intl.NumberFormat().format(
              (120200 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Swap ETH to ILSI</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (46700 * props.gasPrice * props.ethPrice) / 1000000000
            )}{" "}
            $
          </StatNumber>
          <StatHelpText>Allow ILSI in LP</StatHelpText>

          <StatNumber>
            {new Intl.NumberFormat().format(
              (170400 * props.gasPrice * props.ethPrice) / 1000000000
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
              ((120200 + 46700 + 170400 + 46454 + 204227) *
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
