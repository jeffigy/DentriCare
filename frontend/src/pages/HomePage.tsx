import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import bg from "assets/HomePageBg.jpg";
import useTitle from "hooks/useTitle";
import { Link } from "react-router-dom";

const HomePage = () => {
  useTitle("DentriCare");
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}
            >
              Welcome to
            </Text>
            <br />{" "}
            <Text color={"blue.500"} as={"span"}>
              DentriCare
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Elevating Dental Care, One Click at a Time
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button as={Link} to={"/login"} rounded={"full"} colorScheme="blue">
              {" "}
              Log in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={bg} />
      </Flex>
    </Stack>
  );
};
export default HomePage;
