import { Flex } from "@chakra-ui/react";
import PatientsList from "features/patients/PatientsList";

const PatientsPage = () => {
  return (
    <Flex justify={"center"} align={"center"} w={"full"}>
      <PatientsList />
    </Flex>
  );
};
export default PatientsPage;
