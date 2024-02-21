import { Flex } from "@chakra-ui/react";
import NewPatientForm from "features/patients/NewPatientForm";
import useTitle from "hooks/useTitle";

const NewPatientPage = () => {
  useTitle("New Patient");
  return (
    <Flex w={"full"} justify={"center"}>
      <NewPatientForm />
    </Flex>
  );
};
export default NewPatientPage;
