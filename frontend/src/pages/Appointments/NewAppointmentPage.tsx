import { Flex } from "@chakra-ui/react";
import NewAppointmentForm from "features/appointments/NewAppointmentForm";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import useTitle from "hooks/useTitle";
import { Patient } from "types/Patient";

const NewAppointmentPage = () => {
  useTitle("New Appointment");
  const { patients } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patients: data?.ids.map((id) => data.entities[id]),
    }),
  });

  return (
    <Flex w={"full"} justify={"center"}>
      <NewAppointmentForm patients={patients as Patient[]} />
    </Flex>
  );
};
export default NewAppointmentPage;
