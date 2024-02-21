import {
  Stat,
  Box,
  Flex,
  StatLabel,
  StatNumber,
  Icon,
  Card,
} from "@chakra-ui/react";

import React from "react";

type StatsCardProps = {
  title: string;
  stat: string;
  icon: React.ElementType;
};

const StatsCard: React.FC<StatsCardProps> = (props) => {
  const { title, stat, icon } = props;
  return (
    <Stat px={{ base: 2, md: 4 }} py={"5"} as={Card} h={"97px"}>
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} alignContent={"center"}>
          <Icon color={"primary.500"} boxSize={"2em"} as={icon} />
        </Box>
      </Flex>
    </Stat>
  );
};

export default StatsCard;
