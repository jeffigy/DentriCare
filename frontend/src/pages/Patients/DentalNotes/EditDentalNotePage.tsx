import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import EditDentalNoteForm from "features/dental-notes/EditDentalNoteForm";
import { useGetDentalNotesQuery } from "features/dental-notes/dentalNotesApiSlice";
import { useGetProceduresQuery } from "features/procedures/proceduresApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { DentalNote } from "types/DentalNote";
import { Procedure } from "types/Procedure";

const EditDentalNotePage = () => {
  useTitle("Edit Dental Note");
  const { id, noteId } = useParams<{ id: string; noteId: string }>();

  const { dentalNote } = useGetDentalNotesQuery("dentalNotesList", {
    selectFromResult: ({ data }) => ({
      dentalNote: data?.entities[noteId as string],
    }),
  });

  const { procedures } = useGetProceduresQuery("proceduresList", {
    selectFromResult: ({ data }) => ({
      procedures: data?.ids.map((id) => data.entities[id]),
    }),
  });

  if (!dentalNote || !procedures) return <DashSpinner />;

  return (
    <Flex w={"full"} justify={"center"}>
      <EditDentalNoteForm
        dentalNote={dentalNote as DentalNote}
        procedures={procedures as Procedure[]}
        patientId={id}
      />
    </Flex>
  );
};
export default EditDentalNotePage;
