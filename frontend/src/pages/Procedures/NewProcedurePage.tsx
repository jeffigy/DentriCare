import { Flex } from "@chakra-ui/react";
import NewProcedureForm from "features/procedures/NewProcedureForm";
import React from "react";

type NewProcedurePageProps = {};

const NewProcedurePage: React.FC<NewProcedurePageProps> = () => {
  return (
    <Flex w={"full"} justify={"center"}>
      <NewProcedureForm />
    </Flex>
  );
};
export default NewProcedurePage;
