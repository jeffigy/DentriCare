import useTitle from "hooks/useTitle";
import AppointmentsCalendar from "features/appointments/AppointmentsCalendar";
import { Box, Flex } from "@chakra-ui/react";
import SummaryCards from "features/landing-page/SummaryCards";

const LandingPage = () => {
  useTitle("Dashboard");

  return (
    <Flex
      w={"full"}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Box flexGrow={1}>
        <SummaryCards />
      </Box>

      <Flex
        justify={"center"}
        display={{
          base: "none",
          lg: "flex",
        }}
      >
        <AppointmentsCalendar />
      </Flex>
    </Flex>
  );
};
export default LandingPage;
