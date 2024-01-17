import { ChevronRightIcon } from "@chakra-ui/icons";
import { Card, Flex, Icon as ChakraIcon, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type NavCardProps = {
  title: string;
  icon: any;
  to: string;
};

const NavCard: React.FC<NavCardProps> = ({ title, icon, to }) => {
  return (
    <Link to={to}>
      <Card
        as={Flex}
        h={"90px"}
        direction={"row"}
        align={"center"}
        p={"10px"}
        justify={"space-between"}
        maxW={{ base: "full", md: "400px" }}
      >
        <ChakraIcon as={icon} color={"primary.500"} boxSize={"35px"} />
        <Text fontSize={"18px"} color={"gray.600"} fontWeight={"bold"}>
          {title}
        </Text>
        <ChakraIcon
          as={ChevronRightIcon}
          color={"primary.500"}
          boxSize={"20px"}
        />
      </Card>
    </Link>
  );
};
export default NavCard;
