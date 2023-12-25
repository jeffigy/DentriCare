import { Flex, Icon, IconButton } from "@chakra-ui/react";
import PatientsList from "features/patients/PatientsList";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
const PatientsPage = () => {
  return (
    <Flex justify={"center"} align={"center"} w={"full"}>
      <IconButton
        as={Link}
        size={"lg"}
        isRound={true}
        aria-label="new-patient"
        icon={<Icon as={FiUserPlus} />}
        sx={{
          position: "fixed",
          right: "16px",
          bottom: "16px",
        }}
        to={"/dash/patients/new"}
      />
      <PatientsList />
    </Flex>
  );
};
export default PatientsPage;
