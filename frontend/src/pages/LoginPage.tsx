import { Flex } from "@chakra-ui/react";
import Login from "features/auth/LoginForm";

const LoginPage = () => {
  return (
    <Flex justify={"center"} align={"center"} w={"full"}>
      <Login />
    </Flex>
  );
};
export default LoginPage;
