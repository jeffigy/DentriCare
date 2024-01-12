import {
  IconButton,
  Menu,
  MenuButton,
  Flex,
  MenuList,
  Avatar,
  Text,
  useToast,
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FiMenu } from "react-icons/fi";
import { useSendLogoutMutation } from "features/auth/authApiSlice";
import useAuth from "hooks/useAuth";
import { ErrorType } from "types/ErrorType";
import { useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import Logo from "assets/logo.svg";
type NavbarProps = {
  onOpen?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const toast = useToast();
  const { email, status } = useAuth();

  const rootRoutes = [
    "/dash",
    "/dash/patients",
    "/dash/users",
    "/dash/treatments",
    "/dash/appointments",
    "/dash/finances",
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
      bgColor={"bg"}
      h={"56px"}
      justify={"space-between"}
      align={"center"}
      px={"50px"}
    >
      <IconButton
        display={{
          base: !rootRoutes.includes(currentPath) ? "flex" : "none",
          md: "none",
        }}
        icon={<ArrowBackIcon boxSize={6} />}
        aria-label="back-button"
        variant={"ghost"}
        borderRadius={"full"}
        onClick={() => navigate(-1)}
      />
      <IconButton
        display={{
          base: rootRoutes.includes(currentPath) && onOpen ? "flex" : "none",
          md: "none",
        }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        borderRadius={"md"}
        icon={<FiMenu />}
      />
      <Link to={"/dash"}>
        <Image src={Logo} boxSize={"40px"} />
      </Link>
      <Menu>
        <MenuButton>
          <Avatar boxSize={"40px"} />
        </MenuButton>
        <MenuList>
          <Flex align={"center"} direction={"column"} p={"10px"}>
            <Avatar mb={"10px"} />
            <Text fontWeight={"bold"} color={"gray.700"} lineHeight={0.9}>
              {email}
            </Text>
            <Text mb={"10px"} color={"gray.700"}>
              {status}
            </Text>
            <Button
              w="full"
              leftIcon={<Icon as={LuLogOut} />}
              onClick={sendLogout}
            >
              {isLoading ? "logging Out..." : "Logout"}
            </Button>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default Navbar;
