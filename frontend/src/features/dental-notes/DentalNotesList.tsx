import { Flex, Stack } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import DentalNoteCard from "features/dental-notes/DentalNoteCard";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { ErrorType } from "types/ErrorType";
import { useGetDentalNotesByPatientIdQuery } from "./dentalNotesApiSlice";

const DentalNotesList = () => {
  useTitle("Dental Notes");
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
    const { ids, entities } = dentalNotes;

    // if (
    //   !ids.length ||
    //   !ids.filter((noteId: string | number) => entities[noteId]?.patient === id)
    //     .length
    // ) {
    //   return <Text>No dental notes found</Text>;
    // }
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
