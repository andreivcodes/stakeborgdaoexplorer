import React, { useEffect, useState } from "react";
import { Flex, Box, useColorModeValue, Text, Stat } from "@chakra-ui/react";
import { Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

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
        background: "grey",
        borderRadius: "4px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }}
    >
      {`${payload[0].payload.address}: ${payload[0].value}`}
    </div>
  ) : null;
};

export default function HoldersPieDistribution(props) {
  const [majority, setMajority] = useState(0);
  useEffect(() => {
    let total = props.data.reduce((a, b) => a + (Number(b["total"]) || 0), 0);

    let majorityTotal = 0;
    let majorityHolders = 0;
    for (let i = 0; i < props.data.length; i++) {
      console.log(props.data[i].total);
      majorityTotal += props.data[i].total;
      majorityHolders++;
      if (majorityTotal > total / 2) break;
    }

    setMajority(majorityHolders);
  }, [props.data]);

  const [showTooltip, setShowTooltip] = React.useState(false);
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
          <Text>Distribution pie chart</Text>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              width={500}
              height={300}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Pie
                onMouseEnter={() => setShowTooltip(true)}
                data={props.data}
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
          <Text>Top {majority} hold over 50% of supply</Text>
        </Flex>
      </Stat>
    </Box>
  );
}
