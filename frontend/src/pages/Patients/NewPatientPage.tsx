import { Flex } from "@chakra-ui/react";
import NewPatientForm from "features/patients/NewPatientForm";
import React from "react";

type NewPatientPageProps = {};

const NewPatientPage: React.FC<NewPatientPageProps> = () => {
  return (
    <Flex w={"full"} justify={"center"}>
      <NewPatientForm />
    </Flex>
  );
};
export default NewPatientPage;
