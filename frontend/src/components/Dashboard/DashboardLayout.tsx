import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "./DashboardFooter";

const DashboardLayout = () => {
  return (
    <Flex direction={"column"} w={"full"}>
      <DashboardNavbar />
      <Box flexGrow={1} w={"full"} p={"20px"}>
        <Outlet />
      </Box>
      <DashboardFooter />
    </Flex>
  );
};
export default DashboardLayout;
