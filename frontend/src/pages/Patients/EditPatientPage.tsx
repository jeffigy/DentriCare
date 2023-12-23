import { Flex } from "@chakra-ui/react";
import EditPatientForm from "features/patients/EditPatientForm";
import React from "react";

type EditPatientPageProps = {};

const EditPatientPage: React.FC<EditPatientPageProps> = () => {
  return (
    <Flex w={"full"} justify={"center"}>
      <EditPatientForm />
    </Flex>
  );
};
export default EditPatientPage;
