import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type DetailProps = {
  title: string;
  value: string;
};

const Detail: React.FC<DetailProps> = ({ title, value }) => {
  return (
    <Flex direction={"column"} mb={"10px"}>
      <Text color={"gray.400"} lineHeight={0.9}>
        {title}
      </Text>
      <Text fontWeight={"bold"} color={"gray.600"}>
        {value}
      </Text>
    </Flex>
  );
};
export default Detail;
