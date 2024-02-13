import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import useTitle from "hooks/useTitle";
import StatsCard from "components/Dashboard/StatCard";
import AppointmentsCalendar from "features/appointments/AppointmentsCalendar";

const LandingPage = () => {
  useTitle("Dashboard");

  const statsInfo = [
    {
      title: "Total Patients",
      stat: "10",
      icon: EditIcon,
    },
    {
      title: "Total Users",
      stat: "10",
      icon: AddIcon,
    },
    {
      title: "Total Comments",
      stat: "10",
      icon: DeleteIcon,
    },
  ];

  return (
    <Flex
      w={"full"}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Box flexGrow={1}>
        <SimpleGrid
          mr={{ base: 0, lg: "15px" }}
          columns={{ base: 1, xl: 3 }}
          spacing={"15px"}
        >
          {statsInfo.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              stat={stat.stat}
              icon={stat.icon}
            />
          ))}
        </SimpleGrid>
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
