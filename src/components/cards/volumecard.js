import {
  Stat,
  StatLabel,
  StatNumber,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function VolumeCard() {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let response = await (
        await fetch(
          "https://api.coingecko.com/api/v3/coins/stakeborg-dao?market_data=true"
        )
      ).json();
      setVolume(response["market_data"]["total_volume"]["usd"]);
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
          <StatLabel>24 Hours Volume</StatLabel>
          <StatNumber>{new Intl.NumberFormat().format(volume)} $</StatNumber>
        </Stat>
      </Box>
    </Box>
  );
}
