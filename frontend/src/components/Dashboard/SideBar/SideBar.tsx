import {
  Avatar,
  Button,
  CloseButton,
  Flex,
  Icon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navlink from "./NavLink";
import useAuth from "hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { useSendLogoutMutation } from "features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
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
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const { email, status, isAdmin, isSuperAdmin } = useAuth();

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

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Logout successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/", { replace: true });
    }
    if (isError) {
      toast({
        title: "Error",
        description: (error as ErrorType).data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, navigate]);

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
      <Flex
        align={"center"}
        direction={"column"}
        p={"10px"}
        m={"4"}
        bgColor={"#3e65f2"}
      >
        <Avatar mb={"10px"} />
        <Text fontWeight={"bold"} color={"gray.700"} lineHeight={0.9}>
          {email}
        </Text>
        <Text mb={"10px"} color={"gray.700"}>
          {status}
        </Text>
        <Button
          colorScheme="secondary"
          w="full"
          leftIcon={<Icon as={MdLogout} isLoading />}
          onClick={sendLogout}
        >
          {isLoading ? "logging Out..." : "Logout"}
        </Button>
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
