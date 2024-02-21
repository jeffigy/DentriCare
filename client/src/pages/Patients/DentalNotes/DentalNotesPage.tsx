import { Flex } from "@chakra-ui/react";
import { MdPostAdd } from "react-icons/md";
import FloatingButton from "components/FloatingButton";
import { useParams } from "react-router-dom";
import DentalNotesList from "features/dental-notes/DentalNotesList";
import useTitle from "hooks/useTitle";

const DentalNotesPage = () => {
  const { id } = useParams<{ id: string }>();
  useTitle("Dental Notes");
  return (
    <Flex w="full" direction={"column"} align={"center"}>
      <DentalNotesList />
      <FloatingButton
        ariaLabel={"new note"}
        icon={MdPostAdd}
        to={`/dash/patients/${id}/dental-notes/new`}
      />
    </Flex>
  );
};
export default DentalNotesPage;
