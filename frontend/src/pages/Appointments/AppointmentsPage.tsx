import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import AppointmentsList from "features/appointments/AppointmentsList";
import useTitle from "hooks/useTitle";
import { MdPlaylistAdd } from "react-icons/md";

const AppointmentsPage = () => {
  useTitle("Appointments");
  return (
    <Flex w="full" direction={"column"} align={"center"}>
      <AppointmentsList />
      <FloatingButton
        icon={MdPlaylistAdd}
        ariaLabel={"new appointment"}
        to={`/dash/appointments/new`}
      />
    </Flex>
  );
};
export default AppointmentsPage;
