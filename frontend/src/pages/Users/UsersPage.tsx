import { Flex } from "@chakra-ui/react";
import UsersList from "features/users/UsersList";
import { GrUserAdmin } from "react-icons/gr";
import useTitle from "hooks/useTitle";
import FloatingButton from "components/FloatingButton";

const UsersPage = () => {
  useTitle("Users");
  return (
    <Flex justify={"center"} align={"center"}>
      <FloatingButton
        ariaLabel="new-user"
        icon={GrUserAdmin}
        to={"/dash/users/new"}
      />
      <UsersList />
    </Flex>
  );
};
export default UsersPage;
