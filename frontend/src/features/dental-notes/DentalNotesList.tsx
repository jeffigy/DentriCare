import DashSpinner from "components/Dashboard/DashSpinner";
import { useGetDentalNotesQuery } from "./dentalNotesApiSlice";
import { Alert, AlertIcon, Stack, Text } from "@chakra-ui/react";
import { ErrorType } from "types/ErrorType";
import DentalNoteCard from "features/dental-notes/DentalNoteCard";
import { useParams } from "react-router-dom";
import useTitle from "hooks/useTitle";

const DentalNotesList = () => {
  useTitle("Dental Notes");
  const { id } = useParams();
  const {
    data: dentalNotes,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetDentalNotesQuery("dentalNotesList", {
    pollingInterval: 6000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <DashSpinner />;
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        {(error as ErrorType)?.data?.message}
      </Alert>
    );

  if (isSuccess) {
    const { ids, entities } = dentalNotes;

    if (
      !ids.length ||
      !ids.filter((noteId: string | number) => entities[noteId]?.patient === id)
        .length
    ) {
      return <Text>No dental notes found</Text>;
    }
    return (
      <Stack>
        {ids.length &&
          ids
            .filter((noteId) => entities[noteId]?.patient === id)
            .map((dentalNoteId) => (
              <DentalNoteCard
                key={dentalNoteId as string}
                dentalNoteId={dentalNoteId.toString()}
                id={id}
              />
            ))}
      </Stack>
    );
  }
};
export default DentalNotesList;
