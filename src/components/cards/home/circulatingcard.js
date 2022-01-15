import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function CirculatingCard() {
  const [cirsupply, setCirsupply] = useState(0);
  useEffect(() => {
    async function fetchData() {
      let response = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/stakeborg-dao?market_data=true"
        )
      ).json();
      setCirsupply(response["market_data"]["circulating_supply"]);
    }
    fetchData();
  }, []);
  return (
    <Box
      boxShadow="base"
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel>Circulating Supply</StatLabel>
          <StatNumber>
            {new Intl.NumberFormat().format(cirsupply.toFixed(2))}
          </StatNumber>
          tokens
        </Stat>
      </Box>
    </Box>
  );
}
