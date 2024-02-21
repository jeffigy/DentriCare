import { Flex } from "@chakra-ui/react";
import FloatingButton from "components/FloatingButton";
import MedicalHistoryList from "features/medical-history/MedicalHistoryList";
import useTitle from "hooks/useTitle";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useParams } from "react-router-dom";

const MedicalHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  useTitle("Medical History");

  return (
    <Flex w="full" direction={"column"} align={"center"}>
      <MedicalHistoryList />
      <FloatingButton
        ariaLabel="new medical history"
        to={`/dash/patients/${id}/medical-history/new`}
        icon={MdOutlinePlaylistAdd}
      />
    </Flex>
  );
};
export default MedicalHistoryPage;
