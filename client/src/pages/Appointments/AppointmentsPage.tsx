import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import AppointmentsCalendar from "features/appointments/AppointmentsCalendar";
import useTitle from "hooks/useTitle";
import { MdPlaylistAdd } from "react-icons/md";

const AppointmentsPage = () => {
  useTitle("Appointments");
  return (
    <Flex w="full" direction={"column"} align={"center"}>
      <AppointmentsCalendar />
      <FloatingButton
        icon={MdPlaylistAdd}
        ariaLabel={"new appointment"}
        to={`/dash/appointments/new`}
      />
    </Flex>
  );
};
export default AppointmentsPage;
