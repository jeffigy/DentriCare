import { Flex } from "@chakra-ui/react";
import PatientsList from "features/patients/PatientsList";
import { FiUserPlus } from "react-icons/fi";
import useTitle from "hooks/useTitle";
import FloatingButton from "components/FloatingButton";

const PatientsPage = () => {
  useTitle("Patients");
  return (
    <Flex justify={"center"} align={"center"} w={"full"}>
      <FloatingButton
        ariaLabel="new-patient"
        icon={FiUserPlus}
        to={"/dash/patients/new"}
      />
      <PatientsList />
    </Flex>
  );
};
export default PatientsPage;
