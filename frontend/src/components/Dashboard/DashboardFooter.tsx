import { Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";
const DashboardFooter = () => {
  return (
    <Flex
      bgColor={"white"}
      h={"56px"}
      align={"center"}
      justify={"space-between"}
      px={"50px"}
    >
      <Text>© 2023 DentriCare. All rights reserved</Text>
      <HStack spacing={5}>
        <IconButton
          color={"blue.500"}
          aria-label="soc-button"
          isRound={true}
          icon={<FiTwitter />}
        />
        <IconButton
          color={"blue.500"}
          aria-label="soc-button"
          isRound={true}
          icon={<FiFacebook />}
        />
        <IconButton
          color={"blue.500"}
          aria-label="soc-button"
          isRound={true}
          icon={<FiInstagram />}
        />
      </HStack>
    </Flex>
  );
};
export default DashboardFooter;
