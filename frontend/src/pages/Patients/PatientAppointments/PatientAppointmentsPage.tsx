import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import AppointmentsList from "features/appointments/AppointmentsList";
import useTitle from "hooks/useTitle";
import React from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { useParams } from "react-router-dom";

type PatientAppointmentsPageProps = {};

const PatientAppointmentsPage: React.FC<PatientAppointmentsPageProps> = () => {
  useTitle("Patient Appointments");
  const { id } = useParams<{ id: string }>();
  return (
    <Flex w={"full"} justify={"center"}>
      <AppointmentsList />
      <FloatingButton
        icon={MdPlaylistAdd}
        ariaLabel={"new appointment"}
        to={`/dash/appointments/new?patientId=${id}`}
      />
    </Flex>
  );
};
export default PatientAppointmentsPage;
