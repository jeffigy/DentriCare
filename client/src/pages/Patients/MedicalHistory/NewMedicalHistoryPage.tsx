import { Flex } from "@chakra-ui/react";
import NewMedicalHistoryForm from "features/medical-history/NewMedicalHistoryForm";
import useTitle from "hooks/useTitle";

const NewMedicalHistoryPage = () => {
  useTitle("New Medical History");

  return (
    <Flex w="ful" justify="center">
      <NewMedicalHistoryForm />
    </Flex>
  );
};
export default NewMedicalHistoryPage;
