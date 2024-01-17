import { Flex } from "@chakra-ui/react";
import NewDentalNoteForm from "features/dental-notes/NewDentalNoteForm";
import React from "react";
import { useParams } from "react-router-dom";

type NewDentalNotePageProps = {};

const NewDentalNotePage: React.FC<NewDentalNotePageProps> = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Flex w={"full"} justify={"center"}>
      <NewDentalNoteForm />
    </Flex>
  );
};
export default NewDentalNotePage;
