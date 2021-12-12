import React from "react";
import { Flex, Box, useColorModeValue, Text, Stat } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function DistributionChart(props) {
  return (
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
              data={props.data}
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
  );
}
