import { Flex } from "@chakra-ui/react";
import UsersList from "features/users/UsersList";

const UsersPage = () => {
  return (
    <Flex justify={"center"} w={"full"} align={"center"}>
      <UsersList />
    </Flex>
  );
};
export default UsersPage;
