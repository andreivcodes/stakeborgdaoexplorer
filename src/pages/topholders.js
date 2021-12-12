import "./../App.css";
import Header from "./../components/header";
import Footer from "./../components/footer";
import React from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Container,
  Box,
  useColorModeValue,
  Text,
  Skeleton,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Label,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { getAllHoldersData } from "./../utils/userStats";

function CustomTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Th
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
              <Td>
                <Skeleton height="25px" width="5vw" />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <br />
    </>
  );
}

function Topholders() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Holder",
        columns: [
          {
            Header: "Address",
            accessor: "address",
          },
        ],
      },
      {
        Header: "Holdings",
        columns: [
          {
            Header: "Wallet",
            accessor: "wallet",
          },
          {
            Header: "Governance Staking",
            accessor: "governanceStaking",
          },
          {
            Header: "Governance Unclaimed",
            accessor: "governanceUnclaimed",
          },
          {
            Header: "Farming Unclaimed",
            accessor: "farmingUnclaimed",
          },
          {
            Header: "Total",
            accessor: "total",
          },
        ],
      },
    ],
    []
  );
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
  const [showTooltip, setShowTooltip] = React.useState(false);

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

      tmpChartData.sort(function (a, b) {
        return a.total - b.total;
      });

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
      const graphs = new Graphs(totals);
      setBenfordTotal(graphs.getBenfordProbabilities());
      setDistribution(graphs.getDistribution());
    }
    fetchData().catch((error) => alert(error.message));
  }, []);

  const data = React.useMemo(() => holdersData, [holdersData]);

  const Tip = ({ setShowTooltip, ...rest }) => {
    const [payload, setPayload] = React.useState(rest.payload);

    // When the payload has data (area hovered in the chart), add it to the state
    // so we can use it to show and hide the tooltip at our expense
    React.useEffect(() => {
      rest.payload.length && setPayload(rest.payload);
    }, [rest.payload]);

    return payload.length ? (
      <div
        // Tooltip hides when leaving the tooltip itself
        onMouseLeave={() => setShowTooltip(false)}
        // Prevent Rechart events while the mouse is over the tooltip
        onMouseMove={(e) => e.stopPropagation()}
        style={{
          background: "white",
          padding: "2em",
          borderRadius: "4px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      >
        {`${payload[0].payload.address}: ${payload[0].value}`}
      </div>
    ) : null;
  };

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
                <StatLabel>Total in wallets</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat().format(totalWallets)}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
          <GridItem>
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
                <StatLabel>Total staked in governance</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat().format(totalGovernanceStaked)}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
          <GridItem>
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
                <StatNumber>
                  {new Intl.NumberFormat().format(totalGovernanceUnclaimed)}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
          <GridItem>
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
                <StatLabel>Total unclaimed in farming</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat().format(totalFarmingUnclaimed)}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
          <GridItem>
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
                <StatLabel>Total tokens</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat().format(totalTotal)}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
          <GridItem>
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
                <StatLabel>Total staked / Total tokens</StatLabel>
                <StatNumber>
                  {new Intl.NumberFormat().format(
                    totalGovernanceStaked / totalTotal
                  )}
                </StatNumber>
              </Flex>
            </Stat>
          </GridItem>
        </SimpleGrid>
        <Box>
          <Stat>
            <Flex
              m="1"
              p="1"
              boxShadow="base"
              borderWidth="1px"
              borderRadius="lg"
              bg={useColorModeValue("gray.50", "gray.900")}
              flexDirection="column"
              h="50vh"
            >
              <Text>Distribution</Text>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={distribution}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 20,
                    bottom: 25,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={useColorModeValue("grey", "lightgrey")}
                  />
                  <XAxis
                    dataKey="tokens"
                    stroke={useColorModeValue("grey", "lightgrey")}
                  >
                    <Label
                      value="Number of tokens"
                      position="bottom"
                      style={{
                        textAnchor: "middle",
                        fill: useColorModeValue("grey", "lightgrey"),
                      }}
                    />
                  </XAxis>
                  <YAxis
                    dataKey="holders"
                    stroke={useColorModeValue("grey", "lightgrey")}
                  >
                    <Label
                      value="Number of holders"
                      angle={270}
                      position="left"
                      style={{
                        textAnchor: "middle",
                        fill: useColorModeValue("grey", "lightgrey"),
                      }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="holders"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Flex>
          </Stat>
        </Box>
        <SimpleGrid columns={{ sm: 1, lg: 2 }}>
          <Box>
            <Stat>
              <Flex
                m="1"
                p="1"
                boxShadow="base"
                borderWidth="1px"
                borderRadius="lg"
                bg={useColorModeValue("gray.50", "gray.900")}
                flexDirection="column"
                h="50vh"
              >
                <Text>Benford's Law for totals</Text>

                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    width={500}
                    height={300}
                    data={benfordTotal}
                    margin={{
                      top: 5,
                      right: 20,
                      left: -25,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={useColorModeValue("grey", "lightgrey")}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={useColorModeValue("grey", "lightgrey")}
                    />
                    <YAxis
                      tick={false}
                      stroke={useColorModeValue("grey", "lightgrey")}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="benford"
                      fill="#8884d8"
                      legendType="none"
                      tooltipType="none"
                    />
                    <Line
                      type="monotone"
                      dataKey="benford"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Bar
                      dataKey="actual"
                      fill="#82ca9d"
                      legendType="none"
                      tooltipType="none"
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Flex>
            </Stat>
          </Box>

          <Box>
            <Stat>
              <Flex
                m="1"
                p="1"
                boxShadow="base"
                borderWidth="1px"
                borderRadius="lg"
                bg={useColorModeValue("gray.50", "gray.900")}
                flexDirection="column"
                h="50vh"
              >
                <Text>Distribution pie chart</Text>

                <ResponsiveContainer width="100%" height="100%">
                  <PieChart
                    width={500}
                    height={300}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <Pie
                      onMouseEnter={() => setShowTooltip(true)}
                      data={chartTotals}
                      dataKey="total"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                    ></Pie>
                    {showTooltip && (
                      <Tooltip
                        // Anymation is a bit weird when the tooltip shows up after hidding
                        isAnimationActive={false}
                        // Send props down to get the payload
                        content={<Tip setShowTooltip={setShowTooltip} />}
                        // We need this to manage visibility ourselves
                        wrapperStyle={{
                          visibility: "visible",
                          pointerEvents: "auto",
                        }}
                      />
                    )}
                  </PieChart>
                </ResponsiveContainer>
              </Flex>
            </Stat>
          </Box>
        </SimpleGrid>

        <Box
          boxShadow="base"
          mt="1rem"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <CustomTable columns={columns} data={data} />
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Topholders;

/**
 * A JavaScript basic implementation of the Benford Law
 * @param data an integer array to be used on algorithm
 *
 * #### Usage
 * const citiesPopulation = [12252023, 6718903, 3015268, …, 765]
 * const benford = new Benford(citiesPopulation)
 * benford.printAsTable()
 */

function Graphs(data = []) {
  const benfordProbabilities = {
    1: 0.301,
    2: 0.176,
    3: 0.125,
    4: 0.097,
    5: 0.079,
    6: 0.067,
    7: 0.058,
    8: 0.051,
    9: 0.046,
  };
  const initialDigits = {
    1: { count: 0 },
    2: { count: 0 },
    3: { count: 0 },
    4: { count: 0 },
    5: { count: 0 },
    6: { count: 0 },
    7: { count: 0 },
    8: { count: 0 },
    9: { count: 0 },
  };

  const sanitized = data.filter((e) => e > 0);
  this.sanitizedInput = {
    data: sanitized,
    size: sanitized.length,
  };

  this.digits = sanitized.reduce((acc, number) => {
    const digit = +`${number}`.charAt(0);
    const count = acc[digit].count + 1;
    const percentage = count / sanitized.length;
    const deviation = percentage - benfordProbabilities[digit];

    acc[digit] = { count, percentage, deviation };

    return acc;
  }, initialDigits);

  this.getBenfordProbabilities = () => {
    let data = [];
    let index = 1;
    for (let pos in benfordProbabilities) {
      data.push({
        name: index,
        benford: benfordProbabilities[pos],
        actual: this.digits[pos].percentage,
      });
      index++;
    }
    return data;
  };

  this.getDistribution = () => {
    let obj = {};

    for (let i = 0; i < this.sanitizedInput.data.length; i++) {
      let element = this.sanitizedInput.data[i];

      element = Math.ceil(element / 10) * 10;

      // if it exists, add 1 to the value
      if (obj[element] !== undefined) {
        obj[element] += 1;
      } else {
        obj[element] = 1;
      }
    }

    let data = [];

    for (let pos in obj) {
      data.push({ tokens: pos, holders: obj[pos] });
    }
    return data;
  };
}
