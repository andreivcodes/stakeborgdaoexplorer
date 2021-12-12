import {
  Flex,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export default function TotalGovernanceUnclaimed(props) {
  return (
    <Stat>
      <Flex
        m="1"
        p="1"
        boxShadow="base"
        borderWidth="1px"
        borderRadius="lg"
        bg={useColorModeValue("gray.50", "gray.900")}
        flexDirection="column"
      >
        <StatLabel>Total unclaimed in governance</StatLabel>
        <StatNumber>{new Intl.NumberFormat().format(props.data)}</StatNumber>
      </Flex>
    </Stat>
  );
}
