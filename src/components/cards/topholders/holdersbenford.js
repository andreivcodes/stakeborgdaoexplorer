import React from "react";
import { Flex, Box, useColorModeValue, Text, Stat } from "@chakra-ui/react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

export default function BenfordChart(props) {
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
          <Text>Benford's Law for totals</Text>

          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={300}
              data={props.data}
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
  );
}
