import { Flex } from "@chakra-ui/react";
import NewDentalNoteForm from "features/dental-notes/NewDentalNoteForm";
import { useGetProceduresQuery } from "features/procedures/proceduresApiSlice";
import useTitle from "hooks/useTitle";
import React from "react";
import { useParams } from "react-router-dom";
import { Procedure } from "types/Procedure";

type NewDentalNotePageProps = {};

const NewDentalNotePage: React.FC<NewDentalNotePageProps> = () => {
  useTitle("New Dental Note");

  const { id } = useParams<{ id: string }>();
  const { procedures } = useGetProceduresQuery("proceduresList", {
    selectFromResult: ({ data }) => ({
      procedures: data?.ids.map((id) => data.entities[id]),
    }),
  });
  return (
    <Flex w={"full"} justify={"center"}>
      <NewDentalNoteForm
        patientId={id || ""}
        procedures={procedures as Procedure[]}
      />
    </Flex>
  );
};
export default NewDentalNotePage;
