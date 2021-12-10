import {
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PriceCard() {
  const [price, setPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let response = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/stakeborg-dao?market_data=true"
        )
      ).json();
      setPrice(response["market_data"]["current_price"]["usd"]);
      setPriceChange(
        response["market_data"]["price_change_percentage_24h_in_currency"][
          "usd"
        ]
      );
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
          <StatLabel>Current Price</StatLabel>
          <StatNumber>{new Intl.NumberFormat().format(price)} $</StatNumber>
          {priceChange > 0 ? (
            <StatArrow type="increase" />
          ) : (
            <StatArrow type="decrease" />
          )}
          {new Intl.NumberFormat().format(priceChange)} %
        </Stat>
      </Box>
    </Box>
  );
}
