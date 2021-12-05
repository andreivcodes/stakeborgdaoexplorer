import {
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function MarketcapCard() {
  const [mkcap, setMkcap] = useState(0);
  const [mkcapchange, setMkcapChange] = useState(0);
  useEffect(() => {
    async function fetchData() {
      let response = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/stakeborg-dao?market_data=true"
        )
      ).json();
      setMkcap(response["market_data"]["market_cap"]["usd"]);
      setMkcapChange(
        response["market_data"]["market_cap_change_percentage_24h_in_currency"][
          "usd"
        ]
      );
    }
    fetchData();
  }, []);
  return (
    <Box
      h="full"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box m="3">
        <Stat>
          <StatLabel>Market Cap</StatLabel>
          <StatNumber>{new Intl.NumberFormat().format(mkcap)} $</StatNumber>
          {mkcapchange > 0 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {new Intl.NumberFormat().format(mkcapchange)} %
        </Stat>
      </Box>
    </Box>
  );
}
