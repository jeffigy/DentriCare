import {
  Avatar,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSendLogoutMutation } from "features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";
import { ErrorType } from "types/ErrorType";

const DashboardNavbar = () => {
  const { email, status, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Logout successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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
      bgColor={"gray.50"}
      h={"56px"}
      justify={"space-between"}
      align={"center"}
      px={"50px"}
    >
      <Link to={"/dash"}>
        <svg
          id="logo-84"
          width="40"
          height="28"
          viewBox="0 0 40 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.98578 4.11462L0 14C1.99734 15.9773 4.27899 17.6437 6.76664 18.9474C7.45424 20.753 8.53203 22.4463 10 23.8995C15.5229 29.3668 24.4772 29.3668 30 23.8995C31.468 22.4463 32.5458 20.753 33.2334 18.9473C35.721 17.6437 38.0027 15.9773 40 14L30.0223 4.12266C30.0149 4.11527 30.0075 4.10788 30 4.1005C24.4772 -1.36683 15.5229 -1.36683 10 4.1005C9.99527 4.10521 9.99052 4.10991 9.98578 4.11462ZM29.0445 20.7309C26.1345 21.7031 23.0797 22.201 20 22.201C16.9203 22.201 13.8656 21.7031 10.9556 20.7309C11.2709 21.145 11.619 21.5424 12 21.9196C16.4183 26.2935 23.5817 26.2935 28 21.9196C28.381 21.5424 28.7292 21.145 29.0445 20.7309ZM12.2051 5.8824C12.9554 6.37311 13.7532 6.79302 14.588 7.13536C16.3038 7.83892 18.1428 8.20104 20 8.20104C21.8572 8.20104 23.6962 7.83892 25.412 7.13536C26.2468 6.79302 27.0446 6.3731 27.795 5.88238C23.4318 1.77253 16.5682 1.77254 12.2051 5.8824Z"
            fill="#3182CE"
          ></path>
        </svg>
      </Link>
      <HStack spacing={5}>
        <Button variant={"ghost"} as={Link} to={"/dash/patients"}>
          Patients
        </Button>
        {isAdmin || isSuperAdmin ? (
          <Button variant={"ghost"} as={Link} to={"/dash/users"}>
            Users
          </Button>
        ) : null}
      </HStack>
      <Menu>
        <MenuButton as={Avatar} size={"sm"}></MenuButton>
        <MenuList alignItems={"center"}>
          <Center as={Flex} direction={"column"}>
            <Avatar mb={"10px"} />
            <Text fontWeight={"bold"} lineHeight={0.9}>
              {email}
            </Text>
            <Text color={"gray.500"}>{status}</Text>
          </Center>

          <MenuDivider />
          <MenuItem
            as={Button}
            onClick={sendLogout}
            rightIcon={<Icon as={MdLogout} isLoading={isLoading} />}
          >
            {isLoading ? "logging Out..." : "Logout"}
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default DashboardNavbar;
