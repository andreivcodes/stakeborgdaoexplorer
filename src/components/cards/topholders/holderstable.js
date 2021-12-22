import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Skeleton,
  Box,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function CustomTable(props) {
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
            Header: "BOND Farming Unclaimed",
            accessor: "farmingUnclaimed_bond",
          },
          {
            Header: "SWINGBY Farming Unclaimed",
            accessor: "farmingUnclaimed_swingby",
          },
          {
            Header: "XYZ Farming Unclaimed",
            accessor: "farmingUnclaimed_xyz",
          },
          {
            Header: "LP USDC Farming Unclaimed",
            accessor: "farmingUnclaimed_lp_usdc",
          },
          {
            Header: "LP ILSI Farming Unclaimed",
            accessor: "farmingUnclaimed_lp_ilsi",
          },
          {
            Header: "Total Farming Unclaimed",
            accessor: "farmingUnclaimed",
          },
          {
            Header: "Total",
            accessor: "total",
          },
          {
            Header: " % of Total",
            accessor: "percentoftotal",
          },
        ],
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let totaloverall = props.data.reduce(
      (a, b) => a + (Number(b["total"]) || 0),
      0
    );

    props.data.forEach((element) => {
      element.percentoftotal = Number(
        (Number(element.total) * 100) / totaloverall
      );
      element.percentoftotal = Number(element.percentoftotal.toFixed(3));
      element.percentoftotal = element.percentoftotal.toString() + "%";
    });

    setTableData(props.data);
  }, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: tableData,
      },
      useSortBy
    );

  return (
    <Box
      boxShadow="base"
      mt="1rem"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Table {...getTableProps()} size="sm">
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
                      <Td {...cell.getCellProps()}>
                        {cell.render("Cell")}
                        {JSON.parse(process.env.REACT_APP_DEV_LIST).includes(
                          row.values.address
                        ) &&
                        props.labels &&
                        cell.column.Header == "Address" ? (
                          <Badge colorScheme="green">Developer Address</Badge>
                        ) : null}
                        {JSON.parse(
                          process.env.REACT_APP_DEV_FRIEND_LIST
                        ).includes(row.values.address) &&
                        props.labels &&
                        cell.column.Header == "Address" ? (
                          <Badge colorScheme="orange">Developer Contact</Badge>
                        ) : null}
                        {JSON.parse(process.env.REACT_APP_MTD_LIST).includes(
                          row.values.address
                        ) &&
                        props.labels &&
                        cell.column.Header == "Address" ? (
                          <Badge colorScheme="blue">
                            Methodologist Address
                          </Badge>
                        ) : null}
                        {JSON.parse(
                          process.env.REACT_APP_MTD_FRIEND_LIST
                        ).includes(row.values.address) &&
                        props.labels &&
                        cell.column.Header == "Address" ? (
                          <Badge colorScheme="cyan">
                            Methodologist Contact
                          </Badge>
                        ) : null}
                      </Td>
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
    </Box>
  );
}
