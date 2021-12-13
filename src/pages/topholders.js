import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import React from "react";
import {
  Container,
  Box,
  useColorModeValue,
  Text,
  Progress,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { getAllHoldersData } from "./../utils/userStats";

import CustomTable from "./../components/cards/topholders/holderstable";
import HoldersPieDistribution from "./../components/cards/topholders/holderspiedistribution";
import BenfordChart from "../components/cards/topholders/holdersbenford";
import DistributionChart from "../components/cards/topholders/holdersdistribution";
import Distributions from "../utils/distributions";
import TotalInWallets from "../components/cards/topholders/totalinwallets";
import TotalGovernanceStacked from "../components/cards/topholders/totalgovernancestaked";
import TotalGovernanceUnclaimed from "../components/cards/topholders/totalgovernanceunclaimed";
import TotalFarmingUnclaimed from "../components/cards/topholders/totalfarmingunclaimed";
import TotalTokens from "../components/cards/topholders/totaltokens";
import TotalStakeRatio from "../components/cards/topholders/totalstakedratio";

export default function Topholders() {
  const [holdersData, setHoldersData] = useState([]);
  const [entriesTotal, setEntriesTotal] = useState(0);
  const [entriesLoaded, setEntriesLoaded] = useState(0);
  const [requestsLoaded, setRequestsLoaded] = useState(0);
  const [requestsTotal, setRequestsTotal] = useState(0);

  const [benfordTotal, setBenfordTotal] = useState(null);
  const [distribution, setDistribution] = useState([]);

  const [totalWallets, setTotalWallets] = useState(0);
  const [totalGovernanceStaked, setTotalGovernanceStaked] = useState(0);
  const [totalGovernanceUnclaimed, setTotalGovernanceUnclaimed] = useState(0);
  const [totalFarmingUnclaimed, setTotalFarmingUnclaied] = useState(0);
  const [totalTotal, setTotalTotal] = useState(0);

  const [chartTotals, setChartTotals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let data = await getAllHoldersData(
        setEntriesLoaded,
        setEntriesTotal,
        setRequestsLoaded,
        setRequestsTotal
      );
      setHoldersData(data);

      let tmpChartData = [];
      data.map((val) =>
        tmpChartData.push({ address: val.address, total: Number(val.total) })
      );

      tmpChartData
        .sort(function (a, b) {
          return a.total - b.total;
        })
        .reverse();

      setChartTotals(tmpChartData);

      setTotalWallets(data.reduce((a, b) => a + (Number(b["wallet"]) || 0), 0));
      setTotalGovernanceStaked(
        data.reduce((a, b) => a + (Number(b["governanceStaking"]) || 0), 0)
      );
      setTotalGovernanceUnclaimed(
        data.reduce((a, b) => a + (Number(b["governanceUnclaimed"]) || 0), 0)
      );
      setTotalFarmingUnclaied(
        data.reduce((a, b) => a + (Number(b["farmingUnclaimed"]) || 0), 0)
      );
      setTotalTotal(data.reduce((a, b) => a + (Number(b["total"]) || 0), 0));

      let totals = data.map((a) => Math.round(Number(a.total)));
      const distributionSanitizedData = new Distributions(totals);
      setBenfordTotal(distributionSanitizedData.getBenfordProbabilities());
      setDistribution(distributionSanitizedData.getDistribution());
    }
    fetchData().catch((error) => alert(error.message));
  }, []);

  return (
    <div className="App">
      <Header />
      <Container className="pageContainer" maxW="90vw">
        <Text>
          This page uses on-chain data fetched directly from an Ethereum node
        </Text>
        <Text>Since there is no caching, the response time can be slow.</Text>
        <Text fontSize={24} fontWeight={900} mt="1rem">
          Do not refresh!
        </Text>
        <Progress hasStripe value={(requestsLoaded / requestsTotal) * 100} />
        <Text fontSize={16} fontWeight={700}>
          Requests sent {requestsLoaded} of {requestsTotal}
        </Text>
        <Progress hasStripe value={(entriesLoaded / entriesTotal) * 100} />
        <Text fontSize={16} fontWeight={700}>
          Loaded {entriesLoaded} of {entriesTotal}
        </Text>
        <SimpleGrid columns={{ sm: 1, md: 3, lg: 6 }} mt="1rem">
          <GridItem>
            <TotalInWallets data={totalWallets} />
          </GridItem>
          <GridItem>
            <TotalGovernanceStacked data={totalGovernanceStaked} />
          </GridItem>
          <GridItem>
            <TotalGovernanceUnclaimed data={totalGovernanceUnclaimed} />
          </GridItem>
          <GridItem>
            <TotalFarmingUnclaimed data={totalFarmingUnclaimed} />
          </GridItem>
          <GridItem>
            <TotalTokens data={totalTotal} />
          </GridItem>
          <GridItem>
            <TotalStakeRatio
              datagov={totalGovernanceStaked}
              datatotal={totalTotal}
            />
          </GridItem>
        </SimpleGrid>
        <DistributionChart data={distribution} fullData={holdersData} />
        <SimpleGrid columns={{ sm: 1, lg: 2 }}>
          <BenfordChart data={benfordTotal} />
          <HoldersPieDistribution data={chartTotals} />
        </SimpleGrid>

        <CustomTable data={holdersData} />
      </Container>
      <Footer />
    </div>
  );
}
