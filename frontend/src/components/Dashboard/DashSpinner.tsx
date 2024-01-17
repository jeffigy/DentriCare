import { Flex, Spinner } from "@chakra-ui/react";

const DashSpinner = () => {
  return (
    <Flex
      minH="calc( 100vh - 152px )"
      // direction={"column"}
      justify={"center"}
      w={"full"}
      align={"center"}
    >
      <Spinner />
    </Flex>
  );
};
export default DashSpinner;
