import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import PatientsList from "features/patients/PatientsList";
import useTitle from "hooks/useTitle";
import { FiUserPlus } from "react-icons/fi";

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
