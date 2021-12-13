import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  useColorModeValue,
  Text,
  Stat,
  Switch,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceLine,
} from "recharts";

export default function DistributionChart(props) {
  const [average, setAverage] = useState(0);
  const [log, setLog] = useState(false);
  useEffect(() => {
    if (props.fullData.length > 0) {
      var total = 0;
      for (var i = 0; i < props.fullData.length; i++) {
        total += Number(props.fullData[i].total);
      }
      var avg = total / props.fullData.length;

      setAverage(Number(avg.toFixed(0)));
    }
  }, [props.fullData, props.data]);

  const toggleLog = () => {
    setLog(!log);
  };

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
          <Text>Distribution {log ? " logarithmic" : " linear"}</Text>

          <Switch size="md" onChange={toggleLog} />

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
                type="number"
                domain={["auto", "auto"]}
                dataKey="tokens"
                stroke={useColorModeValue("grey", "lightgrey")}
                scale={log ? "log" : "linear"}
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
              <ReferenceLine x={average} stroke="red" label="Average" />
              <Line
                type="monotone"
                dataKey="holders"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
      </Stat>
    </Box>
  );
}
