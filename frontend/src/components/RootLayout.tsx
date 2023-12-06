import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Flex w="full" minH={"100vh"}>
      <Outlet />
    </Flex>
  );
};
export default RootLayout;
