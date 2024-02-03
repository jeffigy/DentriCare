import { Flex } from "@chakra-ui/react";
import EditMedicalHistoryForm from "features/medical-history/EditMedicalHistoryForm";
import { useGetMedicalHistoriesQuery } from "features/medical-history/medicalHistoryApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { MedicalHistory } from "types/MedicalHistory";

const EditMedicalHistoryPage = () => {
  useTitle("Edit Medical History");

  const { historyId } = useParams<{ historyId: string }>();

  const { medicalHistory } = useGetMedicalHistoriesQuery("medicalHistoryList", {
    selectFromResult: ({ data }) => ({
      medicalHistory: data?.entities[historyId as string] as MedicalHistory,
    }),
  });

  return (
    <Flex w={"full"} justify={"center"}>
      <EditMedicalHistoryForm
        medicalHistory={medicalHistory as MedicalHistory}
      />
    </Flex>
  );
};
export default EditMedicalHistoryPage;
