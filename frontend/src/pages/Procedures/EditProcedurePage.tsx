import { Flex } from "@chakra-ui/react";
import DashSpinner from "components/Dashboard/DashSpinner";
import EditProcedureForm from "features/procedures/EditProcedureForm";
import { useGetProceduresQuery } from "features/procedures/proceduresApiSlice";
import useTitle from "hooks/useTitle";
import { useParams } from "react-router-dom";
import { Procedure } from "types/Procedure";

const EditProcedurePage = () => {
  useTitle("Edit Procedure");
  const { id } = useParams<{ id: string }>();
  const { procedure } = useGetProceduresQuery("proceduresList", {
    selectFromResult: ({ data }) => ({
      procedure: data?.entities[id as string] as Procedure,
    }),
  });

  if (!procedure) return <DashSpinner />;

  return (
    <Flex w={"full"} justify={"center"}>
      <EditProcedureForm procedure={procedure as Procedure} />
    </Flex>
  );
};
export default EditProcedurePage;
