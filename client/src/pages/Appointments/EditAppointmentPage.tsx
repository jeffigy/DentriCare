import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import EditAppointmentForm from "features/appointments/EditAppointmentForm";
import { useGetAppointmentsQuery } from "features/appointments/appointmentsApiSlice";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { Appointment } from "types/Appointment";
import { Patient } from "types/Patient";

const EditAppointmentPage = () => {
  useTitle("Edit Appointment");

  const { id } = useParams<{ id: string }>();

  const { appointment } = useGetAppointmentsQuery("appointmentsList", {
    selectFromResult: ({ data }) => ({
      appointment: data?.entities[id as string] as Appointment,
    }),
  });

  const { patients } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patients: data?.ids.map((id) => data.entities[id]),
    }),
  });

  if (!appointment || !patients) return <DashSpinner />;

  return (
    <Flex w={"full"} justify={"center"}>
      <EditAppointmentForm
        appointment={appointment as Appointment}
        patients={patients as Patient[]}
      />
    </Flex>
  );
};
export default EditAppointmentPage;
