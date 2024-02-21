import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import EditPatientForm from "features/patients/EditPatientForm";
import { useGetPatientsQuery } from "features/patients/patientsApiSlice";
import useAuth from "hooks/useAuth";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { Patient } from "types/Patient";

const EditPatientPage = () => {
  useTitle("Edit Patient");

  const { id } = useParams<{ id: string }>();

  const { isAdmin, isSuperAdmin } = useAuth();

  const { patient } = useGetPatientsQuery("patientsList", {
    selectFromResult: ({ data }) => ({
      patient: data?.entities[id as string] as Patient,
    }),
  });

  if (!patient) return <DashSpinner />;

  if (!isAdmin && !isSuperAdmin) {
    <Flex w={"full"} justify={"center"}>
      You are not authorized to view this page.
    </Flex>;
  }

  return (
    <Flex w={"full"} justify={"center"}>
      <EditPatientForm patient={patient as Patient} />
    </Flex>
  );
};
export default EditPatientPage;
