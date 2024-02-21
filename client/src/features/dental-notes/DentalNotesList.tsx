import { Flex, Stack } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import DentalNoteCard from "features/dental-notes/DentalNoteCard";
import { useParams } from "react-router-dom";
import { ErrorType } from "types/Error";
import { useGetDentalNotesByPatientIdQuery } from "./dentalNotesApiSlice";

const DentalNotesList = () => {
  const { id } = useParams();
  const {
    data: dentalNotes,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetDentalNotesByPatientIdQuery(id, {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;

  if (isError)
    return (
      <Flex justify={"center"}>{(error as ErrorType)?.data?.message}</Flex>
    );

  if (isSuccess) {
    return (
      <Stack>
        {dentalNotes.ids.map((dentalNoteId) => (
          <DentalNoteCard
            key={dentalNoteId}
            dentalNoteId={dentalNoteId.toString()}
          />
        ))}
      </Stack>
    );
  }
};
export default DentalNotesList;
