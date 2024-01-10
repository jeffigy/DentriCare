import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./SideBar/SideBar";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH={"100vh"} w="full">
      <SideBar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SideBar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Flex direction={"column"} ml={{ base: 0, md: 60 }} h={"full"}>
        <Navbar onOpen={onOpen} />
        <Box flexGrow={1} w={"full"} p={"20px"}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};
export default Layout;
