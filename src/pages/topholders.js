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
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { getAllHoldersData } from "./../utils/userStats";

import makeData from "./makeData.js";

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
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
              </Td>
              <Td>
                <Center>
                  <Skeleton height="25px" width="5vw" />
                </Center>
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
            Header: "Airdrop Unclaimed",
            accessor: "airdropUnclaimed",
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
  useEffect(() => {
    async function fetchData() {
      //setHoldersData(makeData(2));
      //console.log(makeData(2));
      //console.log(await getAllHoldersData());
      setHoldersData(await getAllHoldersData());
    }
    fetchData();
  }, []);

  const data = React.useMemo(() => holdersData, [holdersData]);

  return (
    <div className="App">
      <Header />
      <Container className="pageContainer" maxW="90vw">
        <Text>
          This pages uses on-chain data fetched directly from an Ethereum node
        </Text>
        <Text>Since there is no caching, the response time can be slower</Text>
        <Box
          mt="1rem"
          w="100%"
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <CustomTable columns={columns} data={data} />
          <Box m="3"></Box>
        </Box>
      </Container>
      <Footer />
    </div>
  );
}

export default Topholders;
