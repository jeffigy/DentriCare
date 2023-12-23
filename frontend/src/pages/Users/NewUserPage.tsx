import { Flex } from "@chakra-ui/react";
import NewUserForm from "features/users/NewUserForm";
import React from "react";

type NewUserPageProps = {};

const NewUserPage: React.FC<NewUserPageProps> = () => {
  return (
    <Flex w={"full"} justify={"center"}>
      <NewUserForm />
    </Flex>
  );
};
export default NewUserPage;
