import { Flex } from "@chakra-ui/react";
import NewProcedureForm from "features/procedures/NewProcedureForm";

const NewProcedurePage = () => {
  return (
    <Flex w={"full"} justify={"center"}>
      <NewProcedureForm />
    </Flex>
  );
};
export default NewProcedurePage;
