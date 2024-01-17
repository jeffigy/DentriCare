import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
type NavLinkProps = {
  name: string;
  icon: any;
  to: string;
  onClose?: () => void;
};

const Navlink: React.FC<NavLinkProps> = ({ name, icon, to, onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Flex
      p={"12px"}
      align={"center"}
      bgColor={isActive ? "bg" : ""}
      sx={{
        "&:hover": {
          backgroundColor: "gray.100",
          color: "gray.400",
          ".chakra-icon": {
            color: "gray.400",
          },
          ".chakra-text": {
            color: "gray.400",
          },
        },
      }}
      as={NavLink}
      mx="4"
      to={to}
      onClick={onClose}
    >
      <Icon
        as={icon}
        boxSize={6}
        color={isActive ? "primary.500" : "bg"}
        mr={"10px"}
      />
      <Text fontWeight={600} color={isActive ? "gray.700" : "bg"}>
        {name}
      </Text>
    </Flex>
  );
};
export default Navlink;
