import {
  Box,
  Drawer,
  DrawerContent,
  Flex,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SideBar from "./SideBar/SideBar";
import { useEffect } from "react";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");

  useEffect(() => {
    if (isLargerThanMD && isOpen) {
      onClose();
    }
  }, [isLargerThanMD, isOpen, onClose]);
  return (
    <Box minH={"100vh"} w="full">
      <SideBar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen && !isLargerThanMD}
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
