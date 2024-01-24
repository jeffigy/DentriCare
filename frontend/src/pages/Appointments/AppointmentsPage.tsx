import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import AppointmentsList from "features/appointments/AppointmentsList";
import { MdPlaylistAdd } from "react-icons/md";
import useTitle from "hooks/useTitle";

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
