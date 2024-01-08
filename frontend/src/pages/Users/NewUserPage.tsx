import { Flex } from "@chakra-ui/react";
import NewUserForm from "features/users/NewUserForm";
import useTitle from "hooks/useTitle";

const NewUserPage = () => {
  useTitle("New User");
  return (
    <Flex w={"full"} justify={"center"}>
      <NewUserForm />
    </Flex>
  );
};
export default NewUserPage;
