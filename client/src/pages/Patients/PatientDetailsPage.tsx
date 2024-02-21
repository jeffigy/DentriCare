import { Flex } from "@chakra-ui/react";
import PatientDetails from "features/patients/PatientDetails";
import useTitle from "hooks/useTitle";

const PatientDetailsPage = () => {
  useTitle("Patient Details");

  return (
    <Flex
      w={"full"}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <PatientDetails />
    </Flex>
  );
};
export default PatientDetailsPage;
