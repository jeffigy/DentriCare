import { Flex } from "@chakra-ui/react";
import Login from "features/auth/LoginForm";
import useTitle from "hooks/useTitle";

const LoginPage = () => {
  useTitle("Login");
  return (
    <Flex justify={"center"} align={"center"} w={"full"}>
      <Login />
    </Flex>
  );
};
export default LoginPage;
