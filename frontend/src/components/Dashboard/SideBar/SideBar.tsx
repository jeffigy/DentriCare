import { CloseButton, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Navlink from "./NavLink";
import useAuth from "hooks/useAuth";
import {
  LuUsers,
  LuHome,
  LuBarChart3,
  LuShapes,
  LuClipboardList,
} from "react-icons/lu";
import { RiShieldUserLine } from "react-icons/ri";

type SideBarProps = {
  onClose?: () => void;
  display?: any;
};

const SideBar: React.FC<SideBarProps> = ({ onClose, display }) => {
  const { isAdmin, isSuperAdmin } = useAuth();
  const LinkItems = [
    { name: "Dashboard", icon: LuHome, to: "/dash" },
    { name: "Appointments", icon: LuClipboardList, to: "/dash/appointments" },
    { name: "Treatments", icon: LuShapes, to: "/dash/treatments" },
    { name: "Patients", icon: LuUsers, to: "/dash/patients" },
    ...(isAdmin || isSuperAdmin
      ? [
          { name: "Users", icon: RiShieldUserLine, to: "/dash/users" },
          { name: "Finances", icon: LuBarChart3, to: "/dash/finances" },
        ]
      : []),
  ];

  return (
    <Flex
      direction={"column"}
      transition="1s ease"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      bgColor={"#2d53da"}
      display={display}
    >
      <Flex mx={"4"} h="56px" align="center" justifyContent="space-between">
        <Text fontSize="2xl" color={"gray.800"} fontWeight="bold">
          DentriCare
        </Text>
        <CloseButton
          display={{ base: "block", md: "none" }}
          onClick={onClose}
        />
      </Flex>

      <Stack>
        {LinkItems.map((item) => (
          <Navlink key={item.name} {...item} onClose={onClose} />
        ))}
      </Stack>
    </Flex>
  );
};
export default SideBar;
