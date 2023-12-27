import { Flex, Spinner } from "@chakra-ui/react";
import { useAppSelector } from "app/hooks";
import EditPatientForm from "features/patients/EditPatientForm";
import { selectPatientById } from "features/patients/patientsApiSlice";
import React from "react";
import { useParams } from "react-router-dom";
import { Patient } from "types/Patient";

type EditPatientPageProps = {};

const EditPatientPage: React.FC<EditPatientPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const patient = useAppSelector((state) => selectPatientById(state, id || ""));
  return (
    <Flex w={"full"} justify={"center"}>
      {patient ? <EditPatientForm patient={patient as Patient} /> : <Spinner />}
    </Flex>
  );
};
export default EditPatientPage;
