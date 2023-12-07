import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = () => {
  return (
    <Flex direction={"column"} w={"full"}>
      <DashboardNavbar />
      <Flex minH={"calc(100vh - 112px)"}>
        <Outlet />
      </Flex>
      <DashboardFooter />
    </Flex>
  );
};
export default DashboardLayout;
