import { Alert, AlertIcon, Flex, Spinner } from "@chakra-ui/react";
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

  if (!patient)
    return (
      <Flex w={"full"} justify={"center"}>
        <Spinner />;
      </Flex>
    );

  if (!isAdmin && !isSuperAdmin) {
    <Flex w={"full"} justify={"center"}>
      <Alert status="error">
        {" "}
        <AlertIcon />
        You are not authorized to view this page.
      </Alert>
      ;
    </Flex>;
  }

  return (
    <Flex w={"full"} justify={"center"}>
      <EditPatientForm patient={patient as Patient} />
    </Flex>
  );
};
export default EditPatientPage;
